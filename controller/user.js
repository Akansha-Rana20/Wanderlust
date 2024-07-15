const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.signUp =async(req,res)=>{
    try{
        let{email,username,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser= await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listing");
        })
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLoginForm =(req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","welcome back to Wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);

};

module.exports.logout =(req,res,next)=>{
    req.logout((err)=>{
     if(err){
      return next(err);
     }
     req.flash("success","you're logged out");
     res.redirect("/listing");
    })
 };