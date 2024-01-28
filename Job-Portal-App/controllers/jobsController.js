import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields!");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

// Update job
export const updateJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields!");
  }
  // find job
  const job = await jobsModel.findOne({ _id: req.params.id });
  if (!job) {
    next(`No jobs found with id: ${req.params.id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to update this job!");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ updateJob });
};

// Delete Job
export const deleteJobController = async (req, res, next) => {
  const deleteJob = await jobsModel.findOneAndDelete({ _id: req.params.id });
  if (!deleteJob) {
    next(`No jobs found with id: ${req.params.id}`);
  }
  if (!req.user.userId === deleteJob.createdBy.toString()) {
    next("You are not authorized to update this job!");
    return;
  }
  res.status(200).json({ deleteJob });
};

//  Job Stats and filter
export const statsJobController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    // search by user job
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // default stats
  const defaultStats={
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview ||0
  }
  // monthly yearly stats
  let monthlyApplication= await jobsModel.aggregate([
{
  $match:{
    createdBy: new mongoose.Types.ObjectId(req.user.userId)
  }
},
{
  $group:{
    _id: {
      year:{$year: '$createdAt'},
      month:{$month: '$createdAt'}
    },
    count:{
      $sum:1
    }
  }
}
  ]);

monthlyApplication=monthlyApplication.map((item)=>{
  const {_id:{year,month},count}=item;
  const date=moment().month(month-1).year(year).format('MM Y');return {date,count};
}).reverse();
  res.status(200).json({ totalJobs: stats.length, stats ,monthlyApplication});
};
