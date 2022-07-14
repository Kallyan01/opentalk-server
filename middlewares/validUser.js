const User = require("../database/schema/user");

module.exports = validUser = async(req,res,next)=>{
    try{
        let data = await User.findOne({_id:req.params._id,"authcode":req.params.authcode});
        if(data)
         next();
         else
         res.status(401).send({auth:false,err:"User Invalid ! Check Your id and authcode"})
    }
    catch(err)
    {
        res.send({"err": err})
    }

}