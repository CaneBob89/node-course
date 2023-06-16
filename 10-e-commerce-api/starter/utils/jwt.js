const jwt=require("jsonwebtoken")
const {StatusCodes}=require("http-status-codes")

const createJWT=({payload})=>{
  const token=jwt.sign(payload,
  process.env.JWT_SECRET ,
  {expiresIn:process.env.JWT_LIFETIME})
  return token
}
const attachCookieToResponse=({res,user})=>{
  const token=createJWT({payload:user})
  const oneDay=1000*60*60*24
  res.cookie("token",token,{
    httpOnly:true,
    expires:new Date(Date.now()+oneDay)
  })
  res.status(StatusCodes.CREATED).json({user})
}

const isTokenValid=({token})=>jwt.verify(token,process.env.JWT_SECRET)
module.exports={
  createJWT,
  isTokenValid,
  attachCookieToResponse
}