# IP & Attribution 
Project: HapagTech – Smart Restaurant Ordering System

---

This document provides a record of the software libraries, development tools, and digital assets utilized in the HapagTech system. It also outlines attribution and licensing considerations to support compliance review prior to any production deployment. For all external libraries, the official license terms as specified in their respective repositories or package metadata shall prevail.

## Frontend libraries *(from frontend/package.json)*
The frontend of the system utilizes the following frameworks, libraries, and development tools:
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

Note: Most of these libraries are distributed under permissive open-source licenses (e.g., MIT, Apache License). However, all licenses must be verified prior to redistribution or production release..

## Backend libraries *(from backend/requirements.txt)*
The backend system is developed using the following technologies and dependencies:
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

Note: Each package’s licensing terms should be reviewed through official sources such as PyPI prior to deployment.

## Development and Deployment Configuration
The project includes configuration and build files that support development and deployment processes:
- `runtime.txt`, `Procfile`, `vercel.json` (deployment configs)
- Build tooling: `vite`, TypeScript, ESLint (frontend)

## Project Assets

- **Frontend Assets** *(frontend/src/assets)*
	- AboutUs/
    - categories/
    - Food-related images (Food.png, Food1.png, etc.)
    - Logo and branding assets (Logo.png, LogoBlue.svg, LogoRed.svg, Wordmark.png, etc.)
    - Team and service-related images

- **Public Assets** *(frontend/public)*
	- Logo and vector graphics
    - Wordmark files

### Ownership and Attribution
All visual assets, including images, icons, logos, and graphical elements contained in the project directories (frontend/src/assets and frontend/public), are originally created, designed, or customized by the project development team for exclusive use within the HapagTech system.

No third-party proprietary assets are knowingly incorporated into the system without appropriate modification, authorization, or compliance with applicable usage rights. Should any external resources be integrated in the future, proper attribution, licensing details, and source references will be documented accordingly.

UI icons utilized through the lucide-react library are subject to the licensing terms of the Lucide icon set and must be used in accordance with those terms.

## Fonts
At present, no externally hosted or bundled font resources are included in the repository. Any future integration of external fonts (e.g., Google Fonts or commercial typefaces) must be accompanied by proper licensing documentation and usage compliance.

## External Services and Integrations
The system may utilize external services for operational support, including:
- Cloud-based image storage and management services (e.g., Cloudinary)
- Potential integration with payment service providers (to be implemented)

All such services are subject to their respective terms of use, data handling policies, and licensing agreements.

## Licensing Considerations
This repository consists of source code and assets developed by the project team. Prior to publication, distribution, or deployment, the following must be ensured:
- All third-party dependencies are reviewed for license compatibility
- Any non-permissive licenses are evaluated against the intended project license
- Proper attribution is provided where required
- All internally developed assets are confirmed to be original or properly authorized
	
## Maintenance of This Document
This document shall be updated whenever new dependencies, assets, or external services are introduced. Each addition must include relevant details such as name, version (if applicable), source, and licensing information.
