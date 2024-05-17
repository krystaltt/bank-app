const router = require("express").Router();
const { User } = require("../models/user");

router.get("/account",async(req,res)=>{
    console.log(req.query)
    const userName=req.query.userName
    try {
      const user= await User.findOne({userName:userName})
      return res.status(200).send({data:user.balance,message:"Find user successfully!"})
    } catch (error) {
      return res.status(500).send({message:"Internal Server Error"})
    }
    
})


//deposit
router.post("/account", async (req, res) => {
  try {
    const userName=req.body.userName
    const user=await User.findOne({userName:userName})
    console.log(user)

    var saveMoney=user.balance
    

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
   
    return res.status(200).send({data:saveMoney,message:"account manipulation successful"})
    
  } catch (error) {
    return res.status(500).send({message:"Internal Server Error"})
  }
});

module.exports = router;
