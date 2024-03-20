# Evilton Airlines

DDD Workshop with [Vlad Khononov](https://twitter.com/vladikk)

## Steps

1. Run Postgres database within a container

   ```bash
   docker compose -f apps/fleet-management/docker-compose.yaml up -d
   ```

2. Install `pnpm` if you don't have it

   ```bash
   npm install -g pnpm
   ```

3. Install dependencies

   ```bash
   pnpm install
   ```

4. Build all apps

   ```bash
   pnpm build:all
   ```

5. Run

   ```bash
   pnpm dev fleet-management
   ```

6. Launch seed to populate database. You can launch it whenever you want to re-initialize the data.

   ```bash
   curl http://localhost:3000/seed
   ```

7. Get some records

   ```bash
   curl http://localhost:3000/api/aircrafts
   ```
