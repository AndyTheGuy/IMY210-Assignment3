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

You can build and start both the backend and frontend services simultaneously using Docker Compose. Run this single command in the project root folder:

```bash
docker compose up --build
```

Once running:
- Open `http://localhost:3000` in the browser to view the blog.
- The backend API will be accessible at `http://localhost:1337`.

