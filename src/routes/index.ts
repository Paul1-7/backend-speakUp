import { Express, RequestHandler, Router } from "express";
import fs from "fs";

const router = Router();

const PATH_ROUTES: string = __dirname;

const removeExtension = (filename: string): string | undefined => {
  return filename.split(".").shift();
};

function routerApi(app: Express): void {
  app.use("/api/v1/", router);
  fs.readdirSync(PATH_ROUTES).filter((file: string) => {
    const name = removeExtension(file);
    if (name !== "index") {
      import(`./${file}`).then((module) => {
        const routeHandler: RequestHandler = module.default;
        router.use(`/${name}`, routeHandler);
      });
    }
  });
}

export default routerApi;
