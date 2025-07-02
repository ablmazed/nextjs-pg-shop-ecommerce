# Build Full-ECommerce Website By Next.js, Drizzle, PostgreSQL ORM and Shadcn

|                |                                                          |
| -------------- | -------------------------------------------------------- |
| Tech           | Next.js, PostgreSQL, Drizzle Orm, Shadcn, PayPal, Stripe |
| UI             | Tailwind, Shadcn, recharts                               |
| Database       | PostgreSQL, Drizzle Orm                                  |
| Payment        | PayPal, Stripe                                           |
| Deployment     | Github, Vercel                                           |
| Authentication | Auth.js, Google Auth, Magic Link                         |
| Others         | uploadthing, resend, zod                                 |

[![next postgresql amazona](/public/assets/images/app.jpg)](https://next-pg-shadcn-ecommerce.vercel.app/)

## View Demo Website

https://nextjs-pg-shop-ecommerce.vercel.app/

## What you will learn

- creating e-commerce website pages by next.js server components
- designing header, footer, sidebar, menu and search box by shadcn and tailwind
- quick view products in modals using nextjs parallel routes with intercepting routes
- create database models by drizzle orm and postgres database
- handling form inputs by react-hook-forms and zod data validator
- updating data by server actions without using any api
- managing shopping cart using http cookies on server side
- handling authentication and authorization by next-auth
- creating customer dashboard to update profile and track orders
- and implement a fully-functional admin dashboard with beautiful charts and handling products, orders and users

## Run Locally

1. Clone repo

   ```shell
    $ git@github.com:ablmazed/nextjs-pg-shop-ecommerce.git
    $ cd nextjs-pg-shop-ecommerce.git
   ```

2. Create .env.local File
   - duplicate .env.example and rename it to .env.local

3. Setup PostgreSQL
   - Vercel PostgreSQL
     - Create database at https://vercel.com/docs/storage/vercel-postgres
     - In .env.local file update POSTGRES_URL to db url
   - OR Local PostgreSQL
     - Install it from https://www.postgresql.org/download
     - In .env.local file update POSTGRES_URL to db url

4. Install and Run

   ```shell
     npm install
     npm run dev
   ```

5. Seed Data

   ```shell
     npx tsx ./db/seed
   ```

6. Admin Login
   - Open http://localhost:3000
   - Click Sign In button
   - Enter admin email "admin@example.com" and password "123456" and click Sign In
