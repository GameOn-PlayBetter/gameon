This is a [Subframe](https://subframe.com) Next.js Starter Kit that provides just enough configuration to get off and running with Subframe.

## Getting Started

First, install dependencies:

```bash
npm install
```

And then run the project:

```bash
npm run dev
```

## Learn More


## Supabase Client Conventions

- **Server-side (API routes, server components, server actions)**  
  Use `src/utils/supabase/server.ts` (SSR client with `@supabase/ssr` + Next.js cookies).

- **Client-side (React client components, hooks, IdleLogout, UI auth/logout)**  
  Use `src/lib/supabase/server.ts` (browser client with `@supabase/supabase-js`).

**Rule of thumb:**  
- Server code → `utils/supabase/server.ts`  
- Client code → `lib/supabase/server.ts`
