import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";

//Register page :/api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({success:false, message: "Missing Details" });
    }
    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res.json({ success: false, message: "Username Already Exists " });

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedpassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    res.json({ success: false, message: "Not Valid" });
    console.log(error.message);
    res.send(error.message);
  }
};

//login page
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send({ success: false, message: "Invalid" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.send({ success: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.send({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "prodction" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.json({ sucess: false }, { message: "Not Authorized" });
    res.send(error.message);
  }
};


//check Auth  :/api/user/is-auth

export const isAuth=async(req,res)=>{
    try{
      const {userId}=req.body;
      const user=await User.findById(userId).select('-password');
      return res.json({success:true,user});
    }catch(error){
      console.log(error.message);
      res.json({success:true,message:error.message});
    }
}




//logout user :/api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "prodction" ? "none" : "strict",
  })
    return res.json({success:true,message:"Logged Out"})
  } 
  catch (error) {
     console.log(error.message);
    res.json({success:true,message:error.message});
  }
};
