# Noble Ekwere | DigitalHub Portfolio

A static, mobile-first personal portfolio and business hub. It introduces Noble, highlights work and services, includes an HTML/CSS learning archive with real source and preview views, and provides WhatsApp-first enquiry links.

## Tech

- HTML5, CSS/Tailwind utility classes, and vanilla JavaScript modules
- No backend, database, account system, or online payment flow
- Intended for deployment on Netlify from the `main` branch

## Run locally

Use a local web server so JavaScript modules and lesson-source requests work correctly. For example, from the repository root run `python -m http.server 8000`, then open `http://localhost:8000`. Opening `index.html` directly with `file://` will not work for module imports and source fetching.

## Update contact details

Edit `js/config.js` and fill in a business-only WhatsApp number and business email before launch. These values are public. Do not add personal or school contact details, secrets, credentials, or private customer information.

## Update portfolio content

- Project entries are maintained in `data/projects.json`.
- Product catalog entries are maintained in `data/products.json`. The catalog is not yet rendered on a separate page in this first delivery.
- Public social and professional links are maintained in `data/links.json`. Keep accounts disabled until they are ready for strangers and customers to view.
- Original HTML/CSS practice files stay in `html/` and `css/`. The learning archive maps lesson buttons to these files, loads their real source for code view, and opens the same saved files in a sandboxed iframe for preview.

## Before publishing

1. Add business-only contact details to `js/config.js`.
2. Verify every service listed is currently offered.
3. Review project screenshots and linked accounts for private/customer data.
4. Verify lesson file paths, media, and relative assets.
5. Test at 360px, 768px, and 1280px widths.
6. Deploy to Netlify over HTTPS and check the deployed form on a phone.
