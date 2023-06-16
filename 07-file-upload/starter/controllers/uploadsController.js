const path=require("path")
const {StatusCodes}=require("http-status-codes")
const CustomError=require("../errors")
const { MIMEType } = require("util")
const cloudinary=require("cloudinary").v2
const fs=require("fs")

const uploadProductImageLocal=async(req,res)=>{
  if(!req.files){
    throw new CustomError.BadRequestError("No file uploaded")
  }
  
  const productImage=req.files.image;
  if(!productImage.mimetype.startsWith("image")){
throw new CustomError.BadRequestError("You must upload a jpg image!")
  }
  const maxSize=1024*1024;
  console.log(productImage.size);
  if(productImage.size>=maxSize){
    throw new CustomError.BadRequestError(`Image can't be bigger than ${maxSize} bytes!`)
  }
  const imagePath=path.join(__dirname,`../public/uploads/${productImage.name}`)
  productImage.mv(imagePath)
  
  res.status(StatusCodes.OK).json({
    image:{
      src:`/uploads/${productImage.name}`
    }
  })
}
const uploadProductImage=async(req,res)=>{
  
const result=await cloudinary.uploader.upload(
  req.files.image.tempFilePath,
  {
    use_filename:true,
    folder:"fileUpload"
  }
)
fs.unlinkSync(req.files.image.tempFilePath)
return res.status(StatusCodes.OK).json({
  image:{
    src:result.secure_url
  }
})
}
module.exports={
  uploadProductImage,
  uploadProductImageLocal
}