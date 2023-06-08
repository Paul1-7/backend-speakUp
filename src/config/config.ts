export const CONFIG = {
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.NODE_ENV || "DEVELOPMENT",
  IsProduction: (): boolean => CONFIG.ENVIRONMENT.toUpperCase() === "PRODUCTION",
  DATABASE_URL: process.env.DATABASE_URL || "",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  SDK_TOKEN: process.env.SDK_TOKEN || "",
};
