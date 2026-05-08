# Run HapagTech Locally

This file describes how to run the HapagTech system locally with both backend and frontend components.

## Prerequisites

- Node.js (recommended v20+)
- npm
- Python 3.12+ (compatible with Django 5.1)
- Git
- Optional: Cloudinary account if you plan to upload images/media

## Backend Setup (Django)

1. Open a terminal and change to the backend folder:

```powershell
cd d:\Roxanne\Codes\HapagTech\backend
```

2. Create a Python virtual environment:

```powershell
python -m venv .venv
```

3. Activate the virtual environment:

```powershell
.venv\Scripts\Activate.ps1
```

4. Install dependencies:

```powershell
pip install -r requirements.txt
```

5. Optional: create a `.env` file in `backend/` with Cloudinary and development variables.

Example `.env`:

```env
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

6. Run database migrations:

```powershell
python manage.py migrate
```

7. Create a Django superuser (optional):

```powershell
python manage.py createsuperuser
```

8. Start the backend server:

```powershell
python manage.py runserver 8000
```

The backend API will be available at:

- `http://127.0.0.1:8000/api/`

## Frontend Setup (React + Vite)

1. Open a terminal and change to the frontend folder:

```powershell
cd d:\Roxanne\Codes\HapagTech\frontend
```

2. Install dependencies:

```powershell
npm install
```

3. Create a `.env` file in `frontend/` with the backend API URL:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

4. Start the frontend development server:

```powershell
npm run dev
```

The frontend app will usually open at:

- `http://127.0.0.1:5173`

## Running the Full System

- Start the backend first on `http://127.0.0.1:8000`
- Start the frontend next on `http://127.0.0.1:5173`
- Make sure the frontend `.env` points to the backend API

## Notes

- The backend uses SQLite by default when `DATABASE_URL` is not set.
- If you do not configure Cloudinary, media upload features may be limited.
- The frontend depends on `VITE_API_URL` to communicate with the backend.

## Quick Commands Summary

```powershell
# Backend
cd d:\Roxanne\Codes\HapagTech\backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000

# Frontend
cd d:\Roxanne\Codes\HapagTech\frontend
npm install
npm run dev
```
