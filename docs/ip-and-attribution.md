# IP & Attribution 
Project: HapagTech – Smart Restaurant Ordering System

---

This file records libraries, developer tools, and static assets used in this repository, plus attribution notes for third-party content. It is intended to help with license reviews and attributions before production release. Where a library or asset has an explicit license, consult the upstream package metadata for the authoritative license text.

## Frontend libraries (from frontend/package.json)
- React
- React DOM
- Vite
- TypeScript (dev)
- Tailwind CSS
- @tailwindcss/vite
- @vitejs/plugin-react
- @tanstack/react-query
- react-router-dom
- react-scroll
- framer-motion
- lucide-react
- sonner
- axios
- zustand
- ESLint and supporting plugins (dev)

Note: Most front-end JS libraries used in this project are distributed under permissive open-source licenses (MIT, Apache), but verify each package's license before redistribution.

## Backend libraries (from backend/requirements.txt)
- Django
- djangorestframework
- djangorestframework-simplejwt
- cloudinary / django-cloudinary-storage
- psycopg2-binary (Postgres driver)
- pillow (image handling)
- python-dotenv
- requests
- dj-database-url
- PyJWT
- tzdata, sqlparse, and other small dependencies

Check each Python package's metadata (e.g., PyPI) for exact license and copyright information.

## Dev & deployment files
- `runtime.txt`, `Procfile`, `vercel.json` (deployment configs)
- Build tooling: `vite`, TypeScript, ESLint (frontend)

## Static assets included in the repo

- Frontend assets (frontend/src/assets):
	- AboutUs/ (directory)
	- categories/ (directory)
	- Food.png, Food1.png, FoodBlue.png, FoodBlue1.png
	- FoodRed.png, FoodRed1.png, FoodRed2.png
	- Logo.png, logo1.png, LogoBlue.svg, LogoRed.svg
	- Mark.png, react.svg, Rhenel.png, Roxanne.png
	- services_icon1.png, services_icon2.png, services_icon3.png
	- Wordmark.png, Wordmark2.png

- Public files (frontend/public):
	- Logo.png, LogoBlue.svg, Vector.svg
	- Wordmark_w_description_1-removebg-preview.png

### Attribution and provenance
- Assets in `frontend/src/assets` and `frontend/public` appear to be created for this project (original graphics and logos). If any of these images were sourced from third-party icon packs, stock sites, or collaborators, add a note here with the source, author, and license (e.g., CC-BY, commercial stock license).
- Icons and UI primitives provided by `lucide-react` are from the Lucide icon set — please follow Lucide's license terms when redistributing those icons.

## Fonts
- No external web fonts are bundled in the repo. If you add hosted or bundled fonts (Google Fonts, commercial fonts), document their license and embedding terms here.

## Third-party services & APIs
- Cloudinary (image hosting) — usage of cloudinary libraries in the backend; subject to Cloudinary's terms.
- Payment processors are not included in code but referenced conceptually — integrate with provider SDKs and abide by their terms.

## Licensing guidance
- This repository contains source code and assets contributed by the project team. Before publishing or distributing:
	- Verify each dependency license in `frontend/package.json` and `backend/requirements.txt`.
	- For any non-MIT/BSD/Apache dependency, confirm compatibility with your chosen project license.
	- If any asset in `frontend/src/assets` is licensed (stock photo, third-party icon), add a file-level attribution line near the asset and note the license here.

## How to update this file
- When you add a new dependency, asset, or third-party service, add a short entry here including: name, version (if applicable), source URL, and license.

If you want, I can: generate a SPDX-compatible bill-of-materials (BOM) from the two dependency manifests, or add license badges and links for each listed package.
