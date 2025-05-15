// import express from "express";
import { Router } from "express";
import DeviseController from "../controller/deviseController.js";

const router = Router();
const deviseController = new DeviseController();

router.get("/", deviseController.getDevise);
router.get("/:code", deviseController.getDeviseCode);

export default router;
