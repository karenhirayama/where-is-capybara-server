import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbUser: string | undefined;
  dbHost: string | undefined;
  dbDatabase: string | undefined;
  dbPassword: string | undefined;
  dbPort: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbDatabase: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: Number(process.env.DB_PORT) || 5432,
};

export default config;
