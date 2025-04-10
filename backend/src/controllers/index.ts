// controller/index.ts 

import { PrismaClient } from "@prisma/client";
import { UrlRepositoryImpl } from "../repository/urlRepositoryImpl";
import { UrlServiceImpl } from "../services/urlServiceImpl";
import { UrlController } from "./urlController";

const prisma = new PrismaClient();
const repository = new UrlRepositoryImpl(prisma);
const service = new UrlServiceImpl(repository);

export const controller = new UrlController(service);
