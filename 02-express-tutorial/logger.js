const logger=(req,res,next)=>{
  const {user}=req.query;
  if(user==="ciccio"){
    console.log("Accepted")
    req.user={name:"ciccio",id:1}
    next()
  }else{
    console.log("Declined")
  }
}