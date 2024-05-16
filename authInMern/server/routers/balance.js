const router = require("express").Router();
const { User } = require("../models/user");

//deposit
router.post("/account", async (req, res) => {
  try {
    const user=res.locals.user
    console.log(user)

    var saveMoney=user.balance
    console.log(req.body)

    if(req.body.deposit.length===0&&req.body.withdraw.length===0){
      return res.status(400).send({message:"please input deposit or withdraw money!"})
    }

    if(req.body.deposit[0]==='-'||req.body.withdraw[0]==='-'){
      return res.status(400).send({message:"please input valid number!"})
    }

    //get the number of deposit or withdraw
    var deposit=0
    if(req.body.deposit.length>0){
      deposit=parseInt(req.body.deposit)
      console.log(deposit)
    }

    var withdraw=0
    if(req.body.withdraw.length>0){
      withdraw=parseInt(req.body.withdraw)
    }

  
    if(withdraw>saveMoney){
      return res.status(400).send({message:"withdraw money can't larger than balance, please input again!"})
    }
    
    saveMoney=saveMoney+deposit
    saveMoney=saveMoney-withdraw

    const filter={userName:user.userName}
    const update={$set:{balance:saveMoney}}
    const result=await User.updateOne(filter,update)
    if(result===0){
      return res.status(500).send({message:"fail to deposit or withdraw, please try again"})
    }
    const newUser=await User.findOne({userName:user.userName})
    return res.status(200).send({data:saveMoney,message:"account manipulation successful"})
    
  } catch (error) {
    return res.status(500).send({message:"Internal Server Error"})
  }
});

module.exports = router;
