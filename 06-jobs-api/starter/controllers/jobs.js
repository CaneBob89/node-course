const { StatusCodes } = require("http-status-codes")
const Job=require("../models/Job")
const{BadRequestError,NotFoundError}=require("../errors")

const getAllJobs=async(req,res)=>{
  const jobs=await Job.find({createdBy:req.user.userID}).sort("createdAt")
  res.status(StatusCodes.OK).json({nbHits:jobs.length,jobs})
}
const getJob=async(req,res)=>{
  const {user:{userID},params:{id:jobID}}=req
  
    const job=await Job.findOne({
      _id:jobID,
      createdBy:userID
    })
  if(!job){
    throw new NotFoundError(`No job with id ${jobID}!`)

  }
  res.status(StatusCodes.OK).json({job})
}

const createJob=async(req,res)=>{
  req.body.createdBy=req.user.userID
  const job=await Job.create(req.body)
  res.status(StatusCodes.CREATED).json(job)
}
const updateJob=async(req,res)=>{
  const {
    body:{company,position},
    params:{id:jobID},
    user:{userID}
  }=req

if(company===""||position===""){
  throw new BadRequestError("Must provide company and position for updating!")
}

  const job=await Job.findOneAndUpdate({
    _id:jobID,
    createdBy:userID
  },
  req.body,
  {
    runValidators:true,
    new:true
  })
  if(!job){
    throw new NotFoundError(`No job with id ${jobID}!`)

  }
  res.status(StatusCodes.OK).json({job})
}

const deleteJob=async(req,res)=>{
  const {params:{id:jobID},user:{userID}}=req
  const job=await Job.findOneAndRemove({
    _id:jobID,
    createdBy:userID
  })
  if(!job){
    throw new NotFoundError(`No job with id ${jobID}!`)
  }
  res.status(StatusCodes.OK).json()
}

module.exports={
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}