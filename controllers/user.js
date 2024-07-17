const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = async (_id)=>{
    return jwt.sign({_id},process.env.SECRET, {expiresIn :"3d"})
}


exports.login = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        // create a token 
        const token = await createToken(user._id);
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}


exports.signUp = async (req,res)=>{
    const {email ,password} = req.body;
    try {
        const user = await User.signup(email, password);
        // create a token 
        const token = await createToken(user._id);
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}