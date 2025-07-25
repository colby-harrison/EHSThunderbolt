# EHS Thunderbolt

Cheyenne East High School's student news website. This platform provides students, staff, and the community with up-to-date news, legacy articles, a teacher directory, bell schedules, and the TBTV student news broadcast.

## Features

- **News Posts & Categories:** Browse and read current news articles organized by category.
- **Legacy Content Migration:** Access archived posts from the old ehsthunderbolt.com website (2015–present).
- **Teacher Directory:** View a searchable directory of East High School teachers.
- **Bell Schedule:** Check the current bell schedule and calendar.
- **TBTV:** Watch the student-produced TBTV news broadcast and access past episodes.
- **Modern Widget-Based UI:** Responsive, accessible, and easy to navigate.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, SSR)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Convex](https://convex.dev/) (backend/database, auth)
- [MDX](https://mdxjs.com/) for content
- [Radix UI](https://www.radix-ui.com/) components
- [Biome](https://biomejs.dev/) for linting/formatting
- [Vercel](https://vercel.com/) for deployment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended)

### Environment Variables

Create a `.env` file in the project root. Required variables (see `src/env.js`):

```
CLERK_SECRET_KEY=your_clerk_secret_key
UPLOADTHING_TOKEN=your_uploadthing_token
NODE_ENV=development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
# Add any other required variables as needed
```

### Install Dependencies

```
pnpm install
```

### Development

Start the development server:

```
pnpm dev
```

### Convex Backend

Convex is used for backend/database and authentication. To start Convex locally:

```
pnpm convex dev
```

See [Convex documentation](https://docs.convex.dev/) for more details.

### Linting & Formatting

Run Biome for linting and formatting:

```
pnpm check
```

## Deployment

This project is ready for deployment on [Vercel](https://vercel.com/). The build command is customized to deploy Convex functions:

```
pnpm convex deploy --cmd 'pnpm run build'
```

See `vercel.json` for details.

## Project Structure

- `src/app/` — Main Next.js app pages and routes
- `src/components/` — UI components and widgets
- `src/content/legacy/` — Legacy posts (MDX)
- `convex/` — Convex backend functions and schema
- `public/` — Static assets

## Contributing

Pull requests and suggestions are welcome! Please open an issue or submit a PR.