## Storyblok Next.js TypeScript Template

This is a template repository for building a Storyblok project with Next.js and TypeScript. It features:

- 100% type safety with TypeScript and runtime validation with https://pureparse.dev/.
- _Real_ Server Components (RSC) support.
- Not dumbed-down
- Opinionated—but flexible.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in the preview token.

Run the development server:

```bash
pnpm dev
```

Run:

```bash
npm run dev
```

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

1. Declare a state
   ```ts
   const [story, setStory] = useState<Story | undefined>()
   ```
1. Render the application with the `story`.
1. Fetch the story and initialize the state with it.
1. Listen for changes to the content with the bridge.
1. For each received change event, update the story.
1. Result: the application re-renders whenever the story changes in the editor.

However, in RSC, the content needs to be fetched from the server: when the client receives the story for the editor, it needs to _somehow_ be passed to the server.

Storyblok provides a solution for this, which is to set a global variable with a server action, invalidate the path, and re-render based on the global variable.

The solution in this codebase is to use an in-memory database (Redis) to store the content received from the visual editor:

1. Fetch from in memrory database (Redis) if available, otherwise fetch from Storyblok.
1. Renderthe content with RSCs.
1. Listen for changes to the content with the bridge.
1. On each event, call a server action that stores the content in an in-memory database (Redis).
1. Revalidate the page.
1. Result: you're back to the first step, now with the content in the in-memory database.

## General

For issues related to the Business blueprint, please open issues at the corresponding template repository:

- Nextjs: https://github.com/storyblok/blueprint-business-nextjs/issues
- Nuxt: https://github.com/storyblok/blueprint-business-nuxt/issues
