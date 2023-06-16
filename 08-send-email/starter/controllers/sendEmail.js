
const nodemailer=require("nodemailer")


const sendEmailEthereal=async(req,res)=>{
  let testAccount=await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'remington.corwin@ethereal.email',
        pass: 'j1Qz9X2vTxGMpEEj4r'
    }
});

let info=await transporter.sendMail({
  from:'"Cicciogamer89" <cicciogamer89@gmail.com>',
  to:'canebob@outlook.it',
  subject:'Hello',
  html:'<h2>Sending emails to canebobProgrammingBoss</h2>'
})
  res.json(info)
}
const sendEmail=async(req,res)=>{
  res.status(require("http-status-codes").StatusCodes.OK).send("Send Email")
}


module.exports=sendEmail