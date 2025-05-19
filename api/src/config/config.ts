import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  port: number;
  nodeEnv: string;
}

interface DBConfig {
  URL: string;
}

interface JWT {
  secretKey: string;
}

interface EMAIL {
  token: string;
}

const envConfig: EnvConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};

const dbConfig: DBConfig = {
  URL: process.env.MONGO_URL || "mongodb://localhost:27018/unichat",
};

const jwtConfig: JWT = {
  secretKey: process.env.JWT_SECRET_KEY || "default_secret_key",
};

const mailtrap: EMAIL = {
  token:
    process.env.TOKEN ??
    (() => {
      throw new Error("Token not found");
    })(),
};

export default { envConfig, dbConfig, jwtConfig, mailtrap };
