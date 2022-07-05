const User = require("../database/schema/user");

module.exports = validUser = async(req,res,next)=>{
    try{
        let data = await User.findOne({"authcode":req.params.authcode});
        if(data)
         next();
         else
         res.send({auth:false,err:"User not found"})
    }
    catch(err)
    {
        res.send({"err": err})
    }

}