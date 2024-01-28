import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  statsJobController,
} from "../controllers/jobsController.js";
const router = express.Router();

//! Routes

//CREATE JOB || POST
router.post("/create-job", userAuth, createJobController);

// GET JOBS || GET
router.get("/get-jobs", userAuth, getAllJobsController);

// UPDATE JOBS || POST || PUT
router.patch("/update-jobs/:id", userAuth, updateJobController);

// DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//  JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, statsJobController);

export default router;
