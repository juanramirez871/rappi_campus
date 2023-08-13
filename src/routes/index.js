import { Router } from "express";
import { readdirSync } from "fs";
import path from 'path';

const PATH_ROUTERS = path.dirname(new URL(import.meta.url).pathname);
const router = Router();

const cleanFile = (fileName) => {
  const file = fileName.split(".").shift();
  return file;
};

const filesNames = readdirSync(PATH_ROUTERS);

filesNames.forEach(async (fileName) => {
    
  const cleanName = cleanFile(fileName);
  if (cleanName === "index") return;
  const moduleRouter = await import(`./${fileName}`);
  router.use(`/${cleanName}`, moduleRouter.router);
});

export default router;