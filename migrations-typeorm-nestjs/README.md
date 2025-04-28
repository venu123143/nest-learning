
# 📚 TypeORM + PostgreSQL Migrations Guide

This project uses **TypeORM** with **PostgreSQL** for database management in a **NestJS** app.

We manage migrations using **TypeORM CLI** and a custom **DataSource** file (`src/data-source.ts`).

---

## ⚙️ Setup

Make sure you have a `.env` file with these database environment variables:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=nestjs_typeorm
NODE_ENV=development
```

Install dependencies:

```bash
npm install
```

---

## 🚀 TypeORM CLI Commands

### 1. Generate a new migration based on entity changes (Recommended)

```bash
npm run migration:generate src/migrations/YourMigrationName
```

Example:
```bash
npm run migration:generate src/migrations/InitialSchema
```

👉 This will automatically detect changes in your entities and create the SQL migration.

---

### 2. Create an empty migration file

```bash
npm run migration:create src/migrations/YourMigrationName
```

Example:
```bash
npm run migration:create src/migrations/AddNewTable
```

👉 You will manually write the SQL queries in the created migration file.

---

### 3. Run all pending migrations

```bash
npm run migration:run
```

👉 This will apply all pending migrations to your PostgreSQL database.

---

### 4. Revert (undo) the last executed migration

```bash
npm run migration:revert
```

👉 This will rollback only the latest migration.

---

## 📄 Seeder (Optional)

> Seeder scripts are **not included by default** in this setup.  
> If you want to add **seeding**, you can create a `src/seeds` folder and manually run seed scripts using a custom command.

**Example (Manual Seeding Approach):**

Create a script like `src/seeds/seed.ts` and run:

```bash
ts-node src/seeds/seed.ts
```

✅ For now, focus on migrations unless you build seeders separately.

---

## 🛠 Available Scripts (package.json)

| Script | Description |
|:-------|:------------|
| `npm run migration:generate` | Generate a migration based on entity changes |
| `npm run migration:create` | Create an empty migration file |
| `npm run migration:run` | Apply all pending migrations |
| `npm run migration:revert` | Undo the last migration |

---

## 🔥 Notes

- Migrations are located at:  
  ```
  src/migrations/
  ```

- Entities are scanned from:  
  ```
  src/**/*.entity.ts
  ```

- The database connection is configured using `src/data-source.ts` (not `ormconfig.json`).

- The CLI automatically uses `ts-node` to run migration commands based on your `DataSource` configuration.

- No hardcoded credentials — always use `.env`!

---

# ✅ Quickstart

```bash
# Install
npm install

# Create initial migration
npm run migration:generate src/migrations/InitialSchema

# Run migrations
npm run migration:run

# (Optional) Revert last migration
npm run migration:revert

# Start server
npm run start:dev
```

---

# 📦 Folder Structure

```
src/
  ├── app.module.ts
  ├── data-source.ts  <-- TypeORM DataSource config
  ├── migrations/
  │     ├── Timestamp_MigrationName.ts
  └── entities/
        ├── *.entity.ts
```

---

# 📢 Important

- Always **generate** or **create** migrations — **never modify migrations** manually after they are pushed.
- Keep your `src/migrations/` folder clean and in sync with your production database schema.
- Always check generated migration code before running it!

Later, if you want, I can help you add **Seeder Support** (using libraries like `typeorm-seeding` or custom scripts).
