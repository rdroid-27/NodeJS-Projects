import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company is required!"],
    },
    position: {
      required: [true, "Position is required!"],
      type: String,
    },
    status: {
      type: String,
      enum: ['pending','reject','interview'],
      default: 'pending'
    },
    workType: {
      type: String,
      enum: ['full-time','part-time','internship','contract'],
    },
    workLocation: {
      type: String,
      default: "Bangalore",
      required: [true, "Work Location is required!"],
    },
    createdBy:{
      type : mongoose.Types.ObjectId ,
      refs :"User"
    }
  },
  { timestamps: true }
);


export default mongoose.model("Jobs", jobsSchema);
