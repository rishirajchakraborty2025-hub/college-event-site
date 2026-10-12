# College Event Management Website

**Course:** PCCCS382 — IT Workshop  
**Department:** CSE (AIML), Institute of Engineering & Management, Kolkata  
**Technologies:** HTML5, CSS3, vanilla JavaScript

## Features
- Responsive single-page website with Home, Events, Registration, Gallery, About Us and Contact sections.
- Futuristic navy, electric-blue and marigold interface with light/dark mode.
- Six event cards rendered from a shared JavaScript data array, category filters, and quick registration buttons.
- Live event countdown and IST digital clock.
- Student registration and feedback forms with inline validation.
- Mobile hamburger navigation and current-section highlighting.
- Reduced-motion support and touch-friendly gallery captions.

## Folder structure
```text
college-event-site/
├── index.html
├── css/style.css
├── js/script.js
├── images/
├── screenshots/
└── REPORT.md
```

## Run locally
Open `index.html` in a modern browser. Google Fonts and gallery/hero images use external URLs and require internet access; system fallbacks are provided for fonts. Replace demo contact details, coordinator names and sample events before publishing.

## Limitations
Forms validate in the browser but do not submit to a backend or persist registrations. Event dates and contact details are sample/demo content. Gallery images are external placeholders; replace them with approved department photographs.


## Supplied image assets
- `images/iem-logo.png`: IEM logo used in the header and footer.
- `images/cultural-night.jpg`, `images/guest-lecture.jpg`, `images/hackathon.jpg`, `images/robotics.jpg`: supplied event artwork used in the gallery and event cards.
- Keep the `css`, `js`, and `images` folders alongside `index.html` so the relative paths resolve correctly. Open `index.html` from this extracted project folder.
