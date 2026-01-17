import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";
import {
  listJobs,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/jobs", listJobs);
router.post("/jobs", isAuthenticated, createJob);
router.post("/jobs/:id/update", isAuthenticated, updateJob);
router.get("/jobs/:id/delete", isAuthenticated, deleteJob);

router.post("/apply/:id", upload.single("resume"), applyJob);

export default router;
