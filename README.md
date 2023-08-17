# Nhost with SvelteKit Example

## Getting started

1. Clone the repository

   ```bash
   git clone https://github.com/onehassan/nhost-sveltekit-example
   cd nhost-sveltekit-example
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a .env file and fill in with your nhost project's `region` and `subdomain`.

   ```bash
   PUBLIC_NHOST_REGION=
   PUBLIC_NHOST_SUBDOMAIN=
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Running locally with the Nhost CLI

1. Create new nhost project using the CLI

   > Make sure you have the [Nhost CLI installed](https://docs.nhost.io/platform/cli).

   ```bash
   nhost init
   ```

2. set the `PUBLIC_NHOST_SUBDOMAIN` to `local` in the `.env` file

   ```bash
   PUBLIC_NHOST_SUBDOMAIN=local
   ```

3. Terminal 1: Start Nhost

   ```sh
   nhost up
   ```

4. Terminal 2: Start the SvelteKit dev server
   ```sh
   npm run dev
   ```
