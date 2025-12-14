const Auth=(req,res,next)=>{
    //Add item into food manu
    // Authentication karna padega ki kya ye admin hi hai nahi
    // dummy code 
    const token = "ABCDEF";
    const Access = token === "ABCDEF" ? 1 : 0;
    if (!Access) {
        res.send("No permission")
    }
    next();
}

module.exports=Auth;