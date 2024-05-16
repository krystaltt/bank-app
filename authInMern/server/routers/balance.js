const router = require("express").Router();
const { User } = require("../models/user");
//const { user }  =require("../routers/login")

//deposit
router.post("/account", async (req, res) => {
  try {
    const user=await User.findOne({userName:"abcdefghi"})
    var saveMoney=user.balance
    const deposit=req.body.deposit
    const withdraw=req.body.withdraw

    if(deposit<0||withdraw<0){
      return res.status(400).send({message:"please input valid number!"})
    }

    if(withdraw>saveMoney){
      return res.status(400).send({message:"withdraw money can't larger than balance, please input again!"})
    }
    
    if(deposit!=0){
      saveMoney=saveMoney+deposit
    }
    
    if(withdraw!=0){
      saveMoney=saveMoney-withdraw
    }

    const filter={userName:user.userName}
    const update={$set:{balance:saveMoney}}
    const result=await User.updateOne(filter,update)
    if(result===0){
      return res.status(500).send({message:"fail to deposit or withdraw, please try again"})
    }
    const newUser=await User.findOne({userName:user.userName})
    return res.status(200).send({data:newUser.balance,message:"account manipulation successful"})
    
  } catch (error) {
    return res.status(500).send({message:"Internal Server Error"})
  }
});

module.exports = router;
