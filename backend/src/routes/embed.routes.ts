import { Router } from "express";
import { embedChannels, embedSend, embedTemplateDelete, embedTemplateSave, embedTemplates } from "../controllers/embed.controller.js";
import { authenticateDashboardAdmin } from "../middleware/auth.js";

export const embedRouter = Router();

embedRouter.use(authenticateDashboardAdmin);
embedRouter.get("/channels", embedChannels);
embedRouter.post("/send", embedSend);
embedRouter.get("/templates", embedTemplates);
embedRouter.post("/templates", embedTemplateSave);
embedRouter.delete("/templates/:id", embedTemplateDelete);
