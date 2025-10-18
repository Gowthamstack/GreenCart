import jwt from 'jsonwebtoken';

const authSeller=async(req,res,next)=>{
    const {sellerToken}=req.cookies;

    if(!sellerToken){
        return res.json({success:true,message:"Not Authorized"});
    }
     try {
            const tokenDecode=jwt.verify(sellerToken,process.env.JWT_SECRET);
            if(tokenDecode.email === process.env.SELLER_EMAIL){
                next()
            }
            else{
                return res.json({success:false,message:"User Not Authorized"});
            }
            next();
        } catch (error) {
            return res.status(401).json({success:false,message:error.message});
            next()
    }
}

export default authSeller;