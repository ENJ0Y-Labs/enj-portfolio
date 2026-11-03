const form = document.querySelector("#feedback-form");
if (form) {
  const status = document.querySelector("#feedback-status");
  const submit = document.querySelector("#feedback-submit");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    status.textContent = "Submitting feedback…";
    status.dataset.state = "";
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    try {
      const response = await fetch("/.netlify/functions/create-feedback-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your feedback could not be submitted. Please try again.");
      status.dataset.state = "success";
      status.textContent = "Thank you. Your feedback has been submitted.";
      if (result.issueUrl) {
        const link = document.createElement("a");
        link.href = result.issueUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = " View the GitHub issue";
        status.append(link);
      }
      form.reset();
    } catch (error) {
      status.dataset.state = "error";
      status.textContent = error.message || "Something went wrong. Please try again.";
    } finally {
      submit.disabled = false;
      submit.removeAttribute("aria-busy");
    }
  });
}
