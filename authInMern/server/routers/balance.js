const router = require("express").Router();
const { User } = require("../models/user");

router.get("/account",async(req,res)=>{
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

    var saveMoney=user.balance

    //the standard pattern of deposit and withdraw number
    const decimalPattern = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

    //get the number of deposit or withdraw
    var deposit=0.00
    if(req.body.deposit.length>0){
      var depositString=req.body.deposit

      //check if deposit is valid or not
      if(!decimalPattern.test(depositString)){
        return res.status(400).send({message:"please input valid number!"})
      }

      if(parseFloat(depositString)>4294967295.99){
        return res.status(400).send({message:"Amount out of range, please try again"})
      }

      deposit=parseFloat(parseFloat(depositString).toFixed(2))
    }

    var withdraw=0.00
    if(req.body.withdraw.length>0){
      var withdrawString=req.body.withdraw
      
      //check if withdraw number is valid or not
      if(!decimalPattern.test(withdrawString)){
        return res.status(400).send({message:"invalid,pattern, please input valid number!"})
      }
      if(parseFloat(withdrawString)>4294967295.99){
        return res.status(400).send({message:"Amount out of range, please try again"})
      }
      withdraw=parseFloat(parseFloat(withdrawString).toFixed(2))
    }

  
    //check if withdraw is larger than balance or not
    if(withdraw>saveMoney){
      return res.status(400).send({message:"withdraw money can't larger than balance, please input again!"})
    }
    
    saveMoney=saveMoney+deposit
    saveMoney=saveMoney-withdraw
    saveMoney=parseFloat(saveMoney.toFixed(2))

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
