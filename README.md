# Create Memberstack App

The fastest way to get started with Memberstack and react is by using `create-memberstack-app`. This CLI tool enables you to quickly build Memberstack apps using react. Initializing a project takes only a few seconds and everything set up for you. You can create a new app using the default Memberstack + Next.js template, or by using one of the [official Memberstack examples](https://github.com/Memberstack/create-memberstack/tree/main/examples). To get started, type the following command in your terminal:

```bash
npx create-memberstack-app@latest
# or
yarn create memberstack-app
# or
pnpm create memberstack-app
```

To create a new app in a specific folder, you can send a name as an argument. For example, the following command will create a new Memberstack app called `crm-app` in a folder with the same name:

```bash
npx create-memberstack-app@latest crm-app
# or
yarn create memberstack-app crm-app
# or
pnpm create memberstack-app crm-app
```

## Options

`create-memberstack-app` comes with the following options:

- **-e, --example [name]|[github-url]** - An example to bootstrap the app with. You can use an example name from the [Create Memberstack repo](https://github.com/Memberstack/create-memberstack/tree/main/examples) or a GitHub URL. The URL can use any branch and/or subdirectory.
- **--use-npm** - Explicitly tell the CLI to bootstrap the app using npm. To bootstrap using yarn we recommend to run `yarn create memberstack-app`
- **--use-pnpm** - Explicitly tell the CLI to bootstrap the app using pnpm. To bootstrap using pnpm we recommend running `pnpm create memberstack-app`

## Why use Create Next App?

`create-next-app` allows you to create a new Next.js app within seconds. It is officially maintained by the creators of Next.js, and includes a number of benefits:

- **Interactive Experience**: Running `npx create-memberstack-app` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Tailwind Included**: Tailwind and React make a great combo, so we included it for you!
- **Offline Support**: Create Memberstack App will automatically detect if you're offline and bootstrap your project using your local package cache.
- **Support for Examples**: Create Memberstack App can bootstrap your application using an example from our official examples collection (e.g. `npx create-memberstack-app --example with-checkout`).

## What's inside?

### Default Dependencies

- `@memberstack/react`: Our official [React Package](https://www.notion.so/memberstack/React-Package-API-79b726ab4daf4fcf9f098e2ed547f521) packed with useful hooks and components for auth, checkout and user management.
- `@memberstack/admin`: Our official [Admin Package](https://www.notion.so/memberstack/Admin-Package-API-5b9233507d734091bd6ed604fb893bb8) that makes it easy to perform administrative tasks on your Memberstack account

### Utilities

Create Memberstack Apps have some additional tools already setup for you:

- [Tailwind CSS](https://www.tailwindcss.com/) for utility-first CSS
- [Prettier](https://prettier.io) for code formatting
