# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Events Notion Pipeline

The events page reads from `server/api/events.ts`, which keeps the Notion token on the server and exposes normalized event data to the frontend through `/api/events`.

1. Create a Notion integration and copy its internal integration token.
2. Share the EventsData Notion table with that integration.
3. Copy `.env.example` to `.env` and set:

```bash
NOTION_API_KEY=secret_your_notion_integration_token
NOTION_EVENTS_DATA_SOURCE_ID=3db749b9b61980df924de00dbedd19be
```

The current table ID is already in `.env.example`. The API accepts common property names so the table can stay editor-friendly:

- Event title: `Name`, `Title`, `Event`, or `Event Name`
- Date/time: `Date`, `Event Date`, `Start`, `Start Date`, or `Time`
- Location: `Location`, `Venue`, `Address`, or `Place`
- Filter label: `Category`, `Campus`, `State`, `Branch`, or `Filter`
- Description: `Description`, `Summary`, `Blurb`, or `Copy`
- Image: page cover, or `Image`, `Poster`, `Cover`, or `Thumbnail`
- Signup URL: `Sign Up`, `Signup`, `Registration`, `Register`, or `Registration Link`
- Details URL: `Details`, `Details Link`, `More Info`, or `Find Out More`
- Visibility: optional `Published`, `Publish`, `Visible`, or `Show on Website`

If Notion is not configured, `/api/events` returns local fallback events so the page still renders during development.
