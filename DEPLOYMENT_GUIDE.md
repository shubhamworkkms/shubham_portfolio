# Deployment & Connection Setup Guide

This guide explains how to connect your **React Frontend (Vercel)** and **Express Backend (Render)** with a **MySQL database** in production.

---

## Architecture Overview

```mermaid
graph LR
    Browser[User Browser]
    Vercel[Vercel Frontend <br/> shubham-portfolio-dun-alpha.vercel.app]
    Render[Render Backend <br/> shubham-portfolio-pjqw.onrender.com]
    MySQL[Hosted MySQL Database <br/> Aiven / Clever Cloud / Railway]

    Browser -->|Fetches Page| Vercel
    Browser -->|Requests /api/portfolio| Vercel
    Vercel -->|Proxy Rewrite| Render
    Render -->|Queries| MySQL
```

1. **Frontend requests** are sent to `/api/portfolio` (same origin).
2. **Vercel's Edge Router** intercepts `/api/*` and proxies them to the Render backend based on the rules in `vercel.json`.
3. **Render Backend** processes the API requests and interacts with the hosted MySQL database.

---

## Step 1: Set Up a Hosted MySQL Database

Since Render does not offer a free MySQL database natively (they only offer PostgreSQL), you need to host your MySQL database on a cloud database provider. 

### Recommended Providers:
1. **Aiven** (Free tier available for MySQL)
2. **Clever Cloud** (Free tier available up to 10MB MySQL)
3. **Railway** (Low-cost pay-as-you-go MySQL)

### Steps to set up:
1. Sign up on your chosen provider (e.g., **Aiven** or **Clever Cloud**).
2. Create a new **MySQL** database service.
3. Once the database is active, copy the **Connection URI / Connection String**. It will look like this:
   ```text
   mysql://user:password@host:port/database_name
   ```
   *(Note: Ensure it starts with `mysql://`. If the provider gives you separate host, user, password, port, and database name, you can construct the URI yourself using the format above, or configure those variables individually).*

---

## Step 2: Configure and Deploy your Backend on Render

1. Go to your **Render Dashboard** (https://dashboard.render.com/) and click **New > Web Service**.
2. Connect your GitHub repository containing the portfolio project.
3. Configure the Web Service settings:
   - **Name**: `shubham-portfolio` (or your preferred name)
   - **Environment / Runtime**: `Node`
   - **Root Directory**: `server` *(This is crucial because your Express app is in the `server/` subfolder)*
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. Add the following **Environment Variables** in the **Environment** tab:
   - `DATABASE_URL`: *[Paste your MySQL Connection URI here]*
   - `PORT`: `5000` *(Render sets this automatically, but setting it explicitly is safe)*
5. Click **Deploy Web Service**.
6. Once deployed, note down your Render Web Service URL (e.g., `https://shubham-portfolio-pjqw.onrender.com`).

---

## Step 3: Link Vercel Frontend to Render Backend

To allow the frontend to communicate with your backend, you must configure Vercel to rewrite `/api` calls to your Render URL.

1. Open the [vercel.json](file:///c:/Users/USER/OneDrive/Desktop/shubham/vercel.json) file in your project's root folder.
2. Verify that the rewrite rule points to **your actual Render URL** (without a trailing slash after `:path*`):
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://YOUR-RENDER-APP-NAME.onrender.com/api/:path*"
       }
     ]
   }
   ```
   *Currently, your file has:*
   ```json
   "destination": "https://shubham-portfolio-pjqw.onrender.com/api/:path*"
   ```
   *If your Render URL is indeed `https://shubham-portfolio-pjqw.onrender.com`, this is already correct. If it is different, update this file.*

3. Push the changes to GitHub to trigger a new build on Vercel:
   ```bash
   git add vercel.json
   git commit -m "Update Render backend URL proxy in vercel.json"
   git push origin main
   ```

---

## Step 4: Verify the Connection

Once both platforms are deployed:
1. Visit your Vercel URL: [https://shubham-portfolio-dun-alpha.vercel.app/](https://shubham-portfolio-dun-alpha.vercel.app/)
2. Open your browser's Developer Tools (`F12`), go to the **Console** and **Network** tabs, and refresh.
3. The app should load your portfolio data from the hosted MySQL database.
4. If the database was empty, the backend will **automatically initialize and seed the tables** on its first startup, so the default values should load immediately!

---

## Troubleshooting

- **CORS Errors**: The backend has CORS fully enabled (`app.use(cors())` in `server/index.js`), so you won't encounter CORS blocking.
- **Database Connection Fails**: If your backend logs on Render show a database connection error:
  - Check that the `DATABASE_URL` is correct.
  - Verify that the hosted MySQL database allows external connections (most free tiers allow this by default).
- **Vercel returns 404/500 for API requests**: Double-check `vercel.json` syntax and ensure you redeployed Vercel after committing any changes to `vercel.json`.
