const express=require("express")
const router=express.Router();

let {people}=require("../data")

const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson
}=require("../controllers/people")

router.route("/").get(getPeople).post(createPerson)
router.put("/:id",updatePerson)
router.post("/postman",(req,res)=>{

})

router.delete("/:id",deletePerson)

module.exports=router