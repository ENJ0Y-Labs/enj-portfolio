# ENJ0Y Portfolio

A static personal portfolio and digital hub for ENJ. It combines professional work, the Pomas project, available design and Microsoft Office services, a product enquiry catalogue, verified public links, and HTML/CSS learning materials.

## Public identity

- Display name: ENJ
- Brand: ENJ0Y (the zero is intentional)
- Location: Port Harcourt, Nigeria
- Available services in this release: graphic design and Microsoft Office document/spreadsheet/presentation formatting
- Planned service: web development (not advertised as currently bookable)
- Payment terms: upfront payment after the scope and quote have been agreed
- CV: available on request, not a public download

## Technology and structure

- HTML, Tailwind CDN utilities, shared CSS theme tokens, and vanilla JavaScript modules
- No backend, database, user accounts, or online payment flow
- `js/config.js`: public identity and business contact settings
- `js/contact.js`: enquiry validation and WhatsApp/email handoff
- `js/theme.js`: light/dark theme toggle; first load follows device preference
- `data/projects.json`: public project information
- `data/products.json`: product enquiry entries
- `data/links.json`: verified public account links
- `links.html`: standalone link-in-bio page
- `html/` and `css/`: existing practice lessons used by the learning archive

## Run locally

Run from the repository root:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`. Do not open the file directly with `file://`, because JavaScript modules and lesson-source requests require a local web server.

## Contact and privacy

The static site uses the business WhatsApp number and email configured in `js/config.js`. These values are public in client-side files even if the email address is shown only through a button in the interface. Do not put credentials, API keys, customer information, or other secrets in this repository.

The enquiry form does not store submissions. WhatsApp opens a pre-filled draft that the visitor must review and send. Email opens the visitor's email application. No contact is sent automatically by the page.

## Catalogue limitations

The website currently shows Thumb Sleeves and Cat Collar as product enquiry cards. Stock and pricing are confirmed through WhatsApp. The official WhatsApp Business catalogue URL and product-specific catalogue item URLs have not been supplied, so these cards open a pre-filled business enquiry instead of claiming to deep-link to a live catalogue item. Product photographs still need to be added to the repository.

## Before publishing

1. Confirm every service description and the upfront-payment wording.
2. Replace placeholder product icons with the supplied product photographs.
3. Add product-specific WhatsApp catalogue links after confirming the official catalogue.
4. Capture Pomas screenshots with all farm, customer, and financial data hidden.
5. Review all remaining media examples and ensure you have the right to publish them.
6. Verify the 23 lesson mappings, embedded assets, and their licensing/ownership.
7. Test contact links and both theme modes at mobile and desktop sizes.
8. Deploy to Netlify over HTTPS and verify the production site on a phone.
