import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../configs/database"))[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);

const modelsDir = path.join(__dirname, "../models");

fs.readdirSync(modelsDir)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== "index.ts" &&
      file !== "index.js" &&
      (file.endsWith(".ts") || file.endsWith(".js")),
  )
  .forEach((file) => {
    const modelInit = require(path.join(modelsDir, file)).default;

    if (typeof modelInit === "function") {
      modelInit(sequelize);
    }
  });

Object.values(sequelize.models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(sequelize.models);
  }
});

export default sequelize;
