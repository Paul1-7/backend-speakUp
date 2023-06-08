import { Sequelize } from "sequelize-typescript";
import { CONFIG } from "~/config/config";

export const sequelize = new Sequelize(CONFIG.DATABASE_URL, {
  dialect: "postgres",
  models: [__dirname + "/models/*.model.ts"],
  modelMatch: (filename: string, member: string) => {
    return filename.substring(0, filename.indexOf(".model")) === member.toLowerCase();
  },
});

export default async function DBInit() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
}
