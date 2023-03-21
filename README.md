# backend

## TOC

- [backend](#backend)
  - [TOC](#toc)
  - [Links](#links)
  - [Development](#development)
    - [Prerequisite](#prerequisite)
    - [Commands](#commands)
  - [Repository Structure](#repository-structure)
  - [Why express, mocha and chai?](#why-express-mocha-and-chai)

## Links

Hosting: <https://api.fitnessapp.gang-of-fork.de/>  
API-Documentation: <https://projekt-fitnessapp.github.io/backend-docs/>  
Prod-Logs: <https://api.fitnessapp.gang-of-fork.de/admin/resources/LogEntry>  
Test coverage report: <https://projekt-fitnessapp.github.io/backend/>

---

## Development

### Prerequisite

Place `.env` file in project root folder. It **must** contain the following variables:

```sh
PORT=[Your Port]
DB_URL=[Your DB Url]
```

### Commands

Install:

```sh
npm install
```

Build:

```sh
npm run build
```

Run:

```sh
npm run start
```

Run with watch:

```sh
npm run devstart
```

Test:

```sh
npm run test
```

Test with coverage:

```sh
npm run coverage
```

Lint:

```sh
npm run lint
```

---

## Repository Structure

- `src/`
  - (`app.ts and server.ts`) Here you find the express server implementation
  - `helpers/`
    - Here helper functions are implemented for tests, logs and development.
  - `middleware/`
    - Here you find the implementation for logging and authentication middlewares.
  - `routes/`
    - Here you find another directory for each specific route.
      - Each consists of a Controller file (where the handlers for each http-Methods are implemented) and Router file (where the routes will be defined).
    - `routes.ts`
      - Summarizing each nested router into one router.
- `test/`
  - For each route a respective nested directory with a test file is created.
  - Each helper file with testable functions has a file with tests nested in `helpers/`.
  - `server.test.ts` specifies tests for the `server.ts` file.

---

## Why express, mocha and chai?

We use express because it is one of the most used backend web framework and a nodejs module. Mocha and Chai are easy to implement test-frameworks.
