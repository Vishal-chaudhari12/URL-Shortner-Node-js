const User = require("../model/user");

async function handleUserSignup(res,res) {
    const {name , email,password}= req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.render("home");
    
}