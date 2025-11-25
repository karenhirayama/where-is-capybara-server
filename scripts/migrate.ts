import fs from "fs";
import path from "path";

import pool from "../src/config/database";

async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log("Start running migrations");

    const migrationPath = path.join(__dirname, "../migrations/init.sql");
    const migrationSQL = fs.readFileSync(migrationPath, "utf8");

    await client.query(migrationSQL);

    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  } finally {
    client.release();
  }
}

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log("Migration process finished");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration process error:", error);
      process.exit(1);
    });
}

runMigrations();
