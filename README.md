# Poker Pro Grid

## Description
Poker Pro Grid is a modern web application that allows poker players to manage and optimise their multi-table tournament (MTT) sessions. The application offers features to create tournament grids, search and filter tournaments.

## Main features
- 🎮 Tournament grid creation and management
- 🔍 Advanced tournament filtering
- 💳 Subscription system with Stripe
- 🔐 Secure authentication with Kinde Auth
- 🎨 Modern and responsive user interface

## Technologies used
- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Animation**: GSAP
- **Authentication**: Kinde Auth
- **Payment**: Stripe
- **Database**: PostgreSQL (with Prisma) via NeonDB
- **Deployment**: Vercel

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL
- Stripe account
- Kinde account
- NeonDB account
- A compatible API (see API section below)

## API Required
This frontend application requires an API to work. You can use :
- The official project API: [poker-pro-grid-api](https://github.com/ElioTourvieille/backend-nest.git)

## Installation

1. Clone the repository
2. Install the dependencies with `npm install` or `yarn install`.
3. Configure environment variables
4. Start the server with `npm run dev` or `yarn dev`.

## Configuration

1. Create a `.env.local` file and configure the environment variables
2. The application requires a REST API providing the data
2. Configure environment variables for Stripe and Kinde

## Deployment

1. Deploy the application with `npm run deploy` or `yarn deploy`.
2. Configure environment variables for Stripe and Kinde

## Project structure
poker-pro-grid/
├── app/ # Pages and routes Next.js

│ ├── api/ # API routes

│ ├── (root)/ # Landing page

│ └── user/ # User pages

│ └── (dashboard)/ # Dashboard page

│ └── grids/ # Grid management page

│ └── tournaments/ # Tournament management page

├── components/ # React components

├── lib/ # Utilities and configurations

└── public/ # Static assets


