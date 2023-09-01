# Getting Started

## NextWord Project

Copy the `.env.example` file into your `.env.local` with the correct information. The default info for this core project can be found in [Vercel](https://vercel.com/simplefocus/nextword/settings/environment-variables).

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Storybook

This project also includes a Storybook containing all the significant components in the repo. It can be accessed locally or at [sf-nextword-stories.vercel.app](sf-nextword-stories.vercel.app).

### Local Build

After installing the dependencies from the project root folder, you can run the following command

```bash
npm run storybook
```

The Storybook will be available at [http://localhost:6006](http://localhost:6006)

### Deployment Branch

The Storybook is deployed automatically deployed to [sf-nextword-stories.vercel.app](sf-nextword-stories.vercel.app) when changes are pushed to [storybook-deploy](https://github.com/simplefocus/NextWord.js/tree/storybook-deploy) branch. This branch contains a `vercel.json` file with all the special deployment rules.

# Running Tests

## Jest

Unit tests are implemented using [Jest](https://jestjs.io/pt-BR/) and are located in the folder `__tests__` at the root of the project. The directory structure follows the root structure with pages, api and component. To run tests use the following command

```bash
npm run test
```
