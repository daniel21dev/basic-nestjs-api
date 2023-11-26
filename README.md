# Requirements

- Nodejs 18^
- Postgresql 15^
- Docker (optional)

# How to run

1. Install dependencies:
   `npm install`

2. Set environment variables:

   - Copy .example.nev and rename it as .env and set your own variables.
   - (optional) You can setup a database using the "docker-postgres.yml" file, just run `docker-compose -f .\docker-postgres.yml up -d`

3. Create/Migrate Database schema: `npx prisma migrate dev`

   - Seed database `npx prisma db seed`

4. Run project:

   - Development mode: `npm run start:dev`
   - Production mode: `npm run build && npm run start:prod`

5. Test project `npm run test`
