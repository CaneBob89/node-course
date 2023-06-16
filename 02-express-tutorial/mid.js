const mid=(req,res,next)=>{
  const user=req.user;
  const method=req.method;
  const date=new Date().getFullYear();
  console.log(user,method,date)
  next()
}
module.exports=mid;