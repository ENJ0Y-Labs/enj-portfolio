const ALLOWED_TYPES = new Set([
  "Bug Report",
  "Feature Request",
  "Design Feedback",
  "Content Feedback",
  "General Feedback"
]);

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

export default async (request) => {
  if (request.method !== "POST") return json(405, { error: "Method not allowed." });

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN is not configured.");
    return json(503, { error: "Feedback submission is temporarily unavailable." });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json(400, { error: "Invalid submission." });
  }

  // Honeypot: silently accept automated spam without creating an issue.
  if (typeof input.website === "string" && input.website.trim()) {
    return json(200, { success: true });
  }

  const type = String(input.type || "").trim();
  const title = String(input.title || "").trim();
  const message = String(input.message || "").trim();
  const contact = String(input.contact || "").trim();

  if (!ALLOWED_TYPES.has(type)) return json(400, { error: "Choose a valid feedback category." });
  if (title.length < 5 || title.length > 120) return json(400, { error: "Title must be between 5 and 120 characters." });
  if (message.length < 15 || message.length > 5000) return json(400, { error: "Description must be between 15 and 5,000 characters." });
  if (contact.length > 120) return json(400, { error: "Contact details are too long." });

  const issueBody = [
    "## Feedback",
    message,
    "",
    "## Category",
    type,
    "",
    contact ? "## Contact details (provided by submitter)" : "",
    contact || "",
    "",
    "---",
    "Submitted through the ENJ0Y portfolio feedback form."
  ].filter(Boolean).join("\n");

  let githubResponse;
  try {
    githubResponse = await fetch("https://api.github.com/repos/ENJ0Y-Labs/enj-portfolio/issues", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: `[${type}] ${title}`, body: issueBody })
    });
  } catch (error) {
    console.error("GitHub issue request failed:", error);
    return json(502, { error: "Could not reach GitHub. Please try again later." });
  }

  if (!githubResponse.ok) {
    console.error("GitHub issue creation failed with status:", githubResponse.status);
    return json(502, { error: "GitHub could not accept the feedback. Please try again later." });
  }

  const issue = await githubResponse.json();
  return json(201, { success: true, issueUrl: issue.html_url });
};
