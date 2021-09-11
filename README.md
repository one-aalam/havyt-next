# Havyt - Next
Boilerplate to quckly get up and running with Next.js with
- __Typescript__ as the language choice
- __Tailwind CSS__ for quick styling without getting out of your HTML
- __ESLint__ for static code analysis
- __Prettier__ for code formatting
- __SEO__ pre-configured
- __Icons & SVG__ support out of the box

and pre-made
- __Message/Alerts__ `coz who don't uses one?

## Configure the Railway App
- https://docs.railway.app/cli/installation
-`railway login`
- `railway init`
```
Starting Point: Empty Project
✔ Enter project name: rycyp█
✔ Environment: production
```
Go to URL: `https://railway.app/project/[project-id]/setup
- `railway link [project-id]`
Go to PostgreSQL plugin page, the `Connect` tab, and copy the Postgres Connection URL

- `railway run` -> `railway up`


## Setup Prisma
- yarn add --dev prisma
- ./node_modules/.bin/prisma init
```
Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver (Preview) or mongodb (Preview).
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
```
- Open the `.env` file and place the connecting string(Postgres Connection URL) against `DATABASE_URL`. Prisma is smart enough to use this by its special annotation in the `/prisma/schema.prisma` file `env("DATABASE_URL")`
- Keep `postgresql` as the DB type

## Seed the Database
`npx prisma db seed --preview-feature`

## See the seeded data
npx prisma studio

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `src/pages/api/hello.ts`.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
