# Nhost SvelteKit Example

## Developing

Create a .env file and fill in with your nhost project's `region` and 'subdomain'

```bash
PUBLIC_NHOST_REGION=
PUBLIC_NHOST_SUBDOMAIN=
```

## Running Locally

```bash
npm run dev
```

## Running Locally Using the Nhost CLI

1. Create an nhost project using the CLI

```bash
$ nhost init
```

2. Run the project

```bash
$ nhost up
```

2. Create a `.env` file and set `PUBLIC_NHOST_SUBDOMAIN` to `local` and leave the `PUBLIC_NHOST_REGION`empty

```bash
PUBLIC_NHOST_REGION=local
PUBLIC_NHOST_REGION=
```

3. Start the sveltekit developement server

```bash
$ npm run dev
```
