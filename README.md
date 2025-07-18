This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Run:

```bash
npm run dev
```

Then open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## About the codebase

Here follows a brief overview of the codebase:

## How to add a new component

To add a new component, you need to do three things:

1. Update the content model, which describes the structure of the content with TypeScript types; see `src/content/content-model.ts`.
2. Update the parser with validates the content, and adjusts for eventual discrepancies; see `src/content/parseContent.ts`.
3. Create a React component that renders the content; see `src/components/`.
4. Add a condition in `src/components/ContentView.tsx` to render it.

## Live Preview and RSC

Storyblok's live preview works by sending the updated content through the iframe via `window.postMessage`. (The Storyblok preview bridge is a library that helps you manage this.) With client-side rendering, you can easily make the live preview work by:

1. Listen for changes to the content with the bridge.
2. For each received event, store the content in a state.
3. Render the application from the state.

However, in RSC, the content needs to be fetched from the server. (On the server, you cannot access client state.) But the bridge sends the updated content via the iframe to the client. Therefore, in this project, you need to choose between live preview and RSC. By default, client-side rendering is enabled. To toggle RSC on, see `src/app/[[...slugs]]/page.tsx`.

A possible workaround would be to:

1. Listen for changes to the content with the bridge.
2. On each event, store the content in an in-memory database, such as Redis.
3. Revalidate the page.
4. In the RSC, fetch the content from the in-memory database.

## General

For issues related to the Business blueprint, please open issues at the corresponding template repository:

- Nextjs: https://github.com/storyblok/blueprint-business-nextjs/issues
- Nuxt: https://github.com/storyblok/blueprint-business-nuxt/issues
