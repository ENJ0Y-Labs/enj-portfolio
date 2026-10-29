# ENJ0Y Portfolio

A static multi-page personal portfolio and digital hub for ENJ. Each primary section has its own HTML page and ordinary links connect the site.

## Pages

- `index.html`: concise homepage and links to the main destinations.
- `about.html`: background, skills, current learning, and availability.
- `projects.html`: public project case studies (currently featuring Pomas).
- `services.html`: graphic design and Microsoft Office formatting; web development remains marked as planned.
- `catalog.html`: thumb sleeves and cat collar enquiry cards.
- `learn.html`: the existing HTML/CSS lesson archive, live preview, and source viewer.
- `cv.html`: request-only CV page; no public CV download.
- `connect.html`: verified public social/professional links.
- `links.html`: standalone link-in-bio page.
- `notes.html`: index for technical notes and articles.
- `faq.html`: answers to common questions.
- `contact.html`: WhatsApp/email enquiry form and direct contact links.

## Shared files

- `global.css`: design tokens, light/dark theme colours, multi-page layout, navigation, shared styles, and logo sizing.
- `logo.png`: shared ENJ0Y logo used in page headers, footers, the link-in-bio page, and browser/home-screen icons.
- `js/tailwind-config.js`: common Tailwind CDN configuration shared by all content pages.
- `js/theme.js`: honours the visitor's device colour preference and provides a theme switch.
- `js/config.js`: public business identity and contact details.
- `js/contact.js`: validates contact input and opens a WhatsApp/email draft; it can preselect an enquiry from a URL query.
- `data/projects.json`, `data/products.json`, and `data/links.json`: starter data records for future rendering or maintenance.

## Run locally

From the repository root, run:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. Do not open files directly with `file://`; JavaScript modules and lesson-source requests need a web server.

## Privacy and catalogue notes

Contact details in a static site are public in its source files. Do not store credentials, API keys, customer records, or private information here. The contact form does not store submissions. It opens the visitor's chosen app with a pre-filled draft, which the visitor must review and send.

The catalog lists thumb sleeves and cat collars without invented prices or stock. The official WhatsApp Business catalogue/item URLs and product photos still need to be added. Until then, the cards create WhatsApp enquiry drafts rather than claiming automatic catalogue sync.

## Pre-launch checks

1. Test links across all pages and use browser Back/Forward.
2. Verify the theme switch in light and dark modes.
3. Test the form, WhatsApp drafts, and email draft on desktop and mobile.
4. Test the Learn page's 23 lesson paths and the separate CSS file tab.
5. Add product photos and official WhatsApp catalogue links.
6. Capture Pomas screenshots with private farm, customer, and financial details hidden.
7. Check layout widths at 360px, 768px, and 1280px, and run an accessibility/Lighthouse review.
8. Verify Netlify is configured to publish this repository root.
