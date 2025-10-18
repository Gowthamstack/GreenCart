//cod /api/orde/cod

import Orders from "../models/order.js";
import Product from "../models/Product.js";

export const placeCOD=async(req,res)=>{
    try{
        const {userId,items,address}=req.body;
        if(!address || items.length==0){
            res.json({success:false,message:"INValid Data"})
        }
        let amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            return await(acc)+product.offerprice * item.quantity;
        },0)
        //Add Charges Tax

        amount+=Math.floor(amount * 0.02);

        await Orders.create({
            userId,
            items,
            address,
            amount,
            paymentType:'COD'
        })

        return res.json({success:true,message:"Order Placed SuccesFully"});

    }catch(error){
        console.log(error.message);
       return res.json({success:false,message:error.message});
        
    }
}


//Get ORDERS By user id   //api/order/user

export const getUserOrders=async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders=await Orders.find({
            userId,
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items Product address").sort({createdAt:-1})
        res.json({sucsess:true,orders})
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

//get all order api/order/seller

export const getAllOrders=async(req,res)=>{
     try {
        const orders=await Orders.find({
            $or : [{paymentType:"COD"},{isPaid:true}]
        }).populate("items Product address").sort({createdAt:-1});
        res.json({sucsess:true,orders})
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}
