# TPS Quote Builder — Azure Deployment Guide

## What You're Deploying

A React single-page application hosted on **Azure Static Web Apps** (free tier).  
All data is stored in the **browser's localStorage** — no database, no backend, no ongoing cost.

> **Important:** Because data is stored locally in the browser, each staff member's quotes are  
> stored on their own machine. For true shared storage (quotes visible to all staff), you will  
> need the Claude.ai version (which uses Claude's shared `window.storage` API). The Azure version  
> is ideal for a single-user setup or where staff work on their own quotes independently.

---

## Prerequisites

- A **GitHub account** (free at github.com)
- A **Microsoft Azure account** (free at portal.azure.com)
- **Node.js 20+** installed on your computer for local testing
- **Git** installed on your computer

---

## Step 1 — Set Up Your Files

You have received a folder called `tps-quote-builder` containing:

```
tps-quote-builder/
├── index.html
├── package.json
├── vite.config.js
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml
└── src/
    ├── main.jsx        ← storage shim + app entry point
    └── App.jsx         ← the full application (258KB)
```

---

## Step 2 — Test Locally First

Open a terminal in the `tps-quote-builder` folder and run:

```bash
npm install
npm run dev
```

Open your browser to `http://localhost:3000`. Confirm the app loads and you can create a quote.  
Press `Ctrl+C` to stop the dev server when done.

---

## Step 3 — Create a GitHub Repository

1. Go to **github.com** and click **New repository**
2. Name it: `tps-quote-builder`
3. Set visibility to **Private** (recommended — this contains TPS rate data)
4. Leave all other settings as default — click **Create repository**
5. GitHub will show you commands. In your terminal (inside the project folder), run:

```bash
git init
git add .
git commit -m "Initial TPS Quote Builder v3"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tps-quote-builder.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4 — Create the Azure Static Web App

1. Go to **portal.azure.com** and sign in
2. Click **Create a resource** → search for **Static Web App** → click **Create**
3. Fill in the form:

| Field | Value |
|-------|-------|
| Subscription | Your Azure subscription |
| Resource Group | Create new: `tps-tools-rg` |
| Name | `tps-quote-builder` |
| Plan type | **Free** |
| Region | **Australia East** |
| Source | **GitHub** |

4. Click **Sign in with GitHub** and authorise Azure
5. Select:
   - **Organisation:** your GitHub username
   - **Repository:** `tps-quote-builder`
   - **Branch:** `main`
6. Build preset: **React**
7. App location: `/`
8. API location: (leave blank)
9. Output location: `dist`
10. Click **Review + Create** → then **Create**

Azure will now:
- Add a secret token to your GitHub repository automatically
- Trigger a GitHub Actions build
- Deploy your app to a URL like `https://lively-sky-abc123.azurestaticapps.net`

---

## Step 5 — Watch the Build

1. Go to your GitHub repository → click **Actions** tab
2. You should see a workflow called **Deploy TPS Quote Builder** running
3. Wait for it to go green (usually 2–4 minutes)
4. Go back to the Azure portal → your Static Web App → click the **URL** shown

Your app is now live.

---

## Step 6 — Set a Custom Domain (Optional)

If TPS has a domain (e.g., `trackps.com.au`), you can host the app at `quotes.trackps.com.au`:

1. In Azure portal → Static Web App → **Custom domains** → **Add**
2. Enter: `quotes.trackps.com.au`
3. Azure will give you a CNAME record to add to your DNS provider
4. Add the CNAME at your DNS provider (e.g., GoDaddy, Cloudflare)
5. Wait up to 30 minutes for DNS to propagate
6. Azure automatically provisions an SSL certificate (HTTPS) — no extra cost

---

## Step 7 — Embed in SharePoint (Optional)

If TPS uses Microsoft 365 / SharePoint:

1. Open your SharePoint page in edit mode
2. Click **+** to add a new web part → search for **Embed**
3. Paste your Azure app URL into the Embed web part
4. Resize the embed to fill the page (set height to at least 900px)
5. Save and publish the page

The app will run inside SharePoint with full functionality.  
Staff can bookmark the SharePoint page or the direct Azure URL.

---

## Updating the App

When a new version of the app is ready (e.g., `TPS_QuoteBuilder_v4.jsx`):

1. Replace `src/App.jsx` with the new file
2. Commit and push to GitHub:

```bash
git add src/App.jsx
git commit -m "Update to Quote Builder v4"
git push
```

GitHub Actions automatically rebuilds and redeploys — no manual steps in Azure.

---

## Data & Privacy

- All quotes are stored in **browser localStorage** on the user's own machine
- Nothing is sent to any external server
- Clearing browser data will erase saved quotes — advise staff to export/print quotes before clearing
- The app contains TPS rate schedule data — keep the GitHub repository **Private**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails in GitHub Actions | Check the Actions tab for the error log; usually a missing dependency |
| App shows blank page | Open browser console (F12) — check for errors; usually a missing `window.storage` |
| PDF filename doesn't auto-set | Some browsers block `document.title` changes before print — use Chrome |
| Quotes lost after browser update | Quotes are in localStorage — they survive updates unless cache is cleared |

---

## Cost Summary

| Service | Cost |
|---------|------|
| Azure Static Web Apps (Free tier) | **$0/month** |
| GitHub (Private repo, Free tier) | **$0/month** |
| Custom domain SSL | **$0** (Azure provides) |
| **Total** | **$0/month** |

The free tier supports 100GB bandwidth/month and 2 custom domains — more than sufficient for internal TPS use.

---

*TPS Quote Builder v3 — Track Protection Services Pty Ltd · ABN 44 158 635 682*
