# Inkspire Blog

**Name:** Andreas Bester  
**Student Number:** u04613628  
**Course:** IMY 210 Assignment 3

Inkspire is a basic blog website built with a Nuxt 3 frontend and a Strapi backend. It uses SQLite for the database.

## Features
- Dark/Light mode toggle (saves theme in localStorage)
- Category filtering on the home page (Design, Dev, Lifestyle, etc.)
- Search page to find posts by title or author name
- Custom markdown-to-HTML parser coded in JavaScript without external npm markdown libraries
- Pre-seeded local PNG images in the frontend public folder

## How to Run Locally

### 1. Run the Strapi Backend
Go to the `backend` folder, install the packages, and run the development server:
```bash
cd backend
npm install
npm run dev
```
*Note: On the first run, the SQLite database is automatically seeded with default posts, categories, and authors.*

### 2. Run the Nuxt Frontend
Open a new terminal, go to the `frontend` folder, install the packages, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in the browser to view the blog.

## How to Run with Docker

If you want to build and run the services inside Docker containers, use these commands:

### Backend
```bash
docker build -t strapi-backend -f backend/Dockerfile.backend backend/
docker run -d -p 1337:1337 --name strapi-cms strapi-backend
```

### Frontend
```bash
docker build -t nuxt-frontend -f frontend/Dockerfile.frontend frontend/
docker run -d -p 3000:3000 --name nuxt-web -e NUXT_PUBLIC_STRAPI_URL=http://localhost:1337 nuxt-frontend
```
