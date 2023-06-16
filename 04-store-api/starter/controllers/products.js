const Product=require("../models/product")

const getAllProductsStatic=async(req,res)=>{

  const products =await Product
  .find({price:{$gt:30,$lt:130}})
  .sort("price")
  .select("price")


res.status(200).json({nbHits:products.length,products})
}

const getAllProducts=async(req,res)=>{
const {featured,company,name,sort,fields, numericFilters}=req.query
const queryObject={}
if(featured){
  queryObject.featured=featured==="true"?true:false
}
if(company){
  queryObject.company=company
}
if(name){
  queryObject.name={$regex:name,$options:"i"}
}
if(numericFilters){
  const Library={
    ">":"$gt",
    ">=":"$gte",
    "=":"$eq",
    "<=":"$lte",
    "<":"$lt",
  }
  const regEx=/\b(>|>=|=|<=|<)\b/g

  let filters=numericFilters.replace(regEx,(item)=>`-${Library[item]}-`)
  
  const options=["price","rating"]
  filters=filters.split(",").forEach((item)=>{
const [name,operator,value]=item.split("-")
if(options.includes(name)){
  queryObject[name]={[operator]:Number(value)}
}
  })
}
console.log(queryObject);
let result=Product.find(queryObject)
if(sort){
  const sortList=sort.split(",").join(" ")
  result.sort(sortList)
}
if(fields){
  const fieldsList=fields.split(",").join(" ")
  result.select(fieldsList)
}
const page=Number(req.query.page)||1
const limit=Number(req.query.limit)||10
const skip=(page-1)*limit
result.skip(skip).limit(limit)

const products=await result
res.status(200).json({nbHits:products.length,products})
}
module.exports={
  getAllProductsStatic,
  getAllProducts,
}