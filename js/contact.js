import { config } from "./config.js";

const form = document.querySelector("#enquiry-form");
if (form) {
  const nameField = form.elements.name;
  const interestField = form.elements.interest;
  const messageField = form.elements.message;
  const budgetField = form.elements.budget;
  const status = document.querySelector("#contact-status");
  const whatsappButton = document.querySelector("#send-whatsapp");
  const emailButton = document.querySelector("#send-email");

  const queryService = new URLSearchParams(window.location.search).get("service");
  if (queryService) {
    const match = [...interestField.options].find((option) => option.value === queryService || option.textContent.trim() === queryService);
    if (match) interestField.value = match.value;
  }

  const whatsappNumber = String(config.whatsappNumber || "").replace(/[^0-9]/g, "");
  const businessEmail = String(config.businessEmail || "").trim();

  // Service-card links jump to the form and preselect the relevant enquiry.
  document.querySelectorAll("[data-enquiry]").forEach((link) => {
    link.addEventListener("click", () => {
      const requested = link.getAttribute("data-enquiry");
      const option = [...interestField.options].find((item) => item.textContent.trim() === requested);
      if (option) interestField.value = option.value;
    });
  });

  function buildMessage() {
    if (!form.reportValidity()) return null;

    const name = nameField.value.trim();
    const interest = interestField.value.trim();
    const message = messageField.value.trim();
    const budget = budgetField.value.trim() || "Not specified";

    if (!name || !interest || !message) {
      status.textContent = "Complete the required fields before continuing.";
      return null;
    }

    return [
      "Hello, I found you through the website.",
      `My name is ${name}.`,
      `I am interested in: ${interest}.`,
      `Message: ${message}`,
      `Budget: ${budget}.`
    ].join("\n");
  }

  whatsappButton?.addEventListener("click", () => {
    const message = buildMessage();
    if (!message) return;

    if (!whatsappNumber) {
      status.textContent = "WhatsApp is not configured. Update js/config.js before launch.";
      return;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    status.textContent = "WhatsApp opened with your enquiry. Review the message and press Send in WhatsApp.";
  });

  emailButton?.addEventListener("click", () => {
    const message = buildMessage();
    if (!message) return;

    if (!businessEmail) {
      status.textContent = "Email is not configured. Update js/config.js before launch.";
      return;
    }

    const subject = `Enquiry: ${interestField.value.trim()} from ${nameField.value.trim()}`;
    window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    status.textContent = "Your email app should open with the enquiry ready to review.";
  });
}
