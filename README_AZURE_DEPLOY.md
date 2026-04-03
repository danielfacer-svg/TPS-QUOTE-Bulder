# TPS Quote Builder - Azure Deployment Guide

## Recommended Azure target
Use Azure Static Web Apps for this app.

Why:
- best fit for a React/Vite front-end
- automatic build and deployment from GitHub
- free/low-cost tiers are available
- easy custom domain support later
- simple SPA routing with staticwebapp.config.json

## What is included
- Vite + React project scaffold
- src/App.jsx containing your quote builder
- package.json
- vite.config.js
- staticwebapp.config.json for SPA routing

## Before deploying
1. Install Node.js locally (Node 20 LTS or newer is a safe choice).
2. Open a terminal in this project folder.
3. Run:
   npm install
   npm run dev
4. Confirm the app works locally.
5. Then run:
   npm run build

## Azure Static Web Apps deployment steps
1. Create a new GitHub repository.
2. Upload the full contents of this folder to that repository.
3. In Azure Portal, create a Static Web App.
4. Choose your subscription and resource group.
5. Link the Static Web App to your GitHub repository.
6. Build preset:
   Framework preset: React
   App location: /
   Output location: dist
7. Create the resource.
8. Azure will generate a GitHub Actions workflow and deploy automatically.

## Important notes
- This app is currently front-end only.
- Saved quotes/local storage behaviours remain browser-based unless you later move persistence to an API/database.
- If you later add secure multi-user data, approvals, or shared directories, you will likely want:
  - Azure Functions or API backend
  - Azure SQL / Cosmos DB / SharePoint backend
  - Azure AD authentication

## Alternative Azure host
If you want to host it as a Node-served web app instead, use Azure App Service.
For this app, Static Web Apps is usually the cleaner choice.

## Current deployment assumptions
- internal estimator first
- no backend required yet
- React/Vite SPA
- future pathway to Azure hosting now, with possible later migration to SharePoint / Power Apps
