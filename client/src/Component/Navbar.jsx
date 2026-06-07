import React, { useEffect, useState } from "react";
import { NavLink,Link } from "react-router-dom";
import { assets } from "../../src/assets/assets";
import { AppContext, useAppContext } from "../../src/Context/AppContext";
import toast from "react-hot-toast";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const ref = React.useRef(null);
    const {navigate,searchQuery,setSearchQuery,getCartCount,showUserLogin,setShowUserLogin,axios,isSeller,user,setUser}=useAppContext();

    const logout=async()=>{
        try {
          const {data}=await axios.get('/api/user/logout');
        if(data.success){
          setUser(null);
          toast.success(data.message);
        }
        } catch (error) {
          toast.error(error.message);
        }
    }
   
      useEffect(()=>{
        if(searchQuery.length>0){
          navigate("/products");
        }  
      },[searchQuery])

  return (
     <nav className="flex items-center justify-between px-4 md:px-14 py-4 border-b border-gray-300 bg-white relative transition-all">

        <NavLink to="/" onClick={()=>setOpen(false)} className="flex items-center font-bold">
            <img src="/favicon.svg" alt="" />
          <h1 className="text-2xl text-black">reenCart</h1>
        </NavLink>

        <div className="hidden md:flex items-center gap-4">
        <div className="hidden md:flex  items-center gap-4 lg:gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                   <img src={assets.search_icon} alt="searchIcon"  className="w-4 h-4"/>
                </div>
          
        </div>
          <div className="relative cursor-pointer">
          <img src={assets.cart_icon} onClick={()=>navigate("/cart")} alt="cart_icon" className="w-6 h-6"/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
          {!user ?(<button to="/login" onClick={()=>setShowUserLogin(true)} className="bg-primary cursor-pointer hover:bg-secondary text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
            Login
          </button>):(<div className="relative group cursor-pointer">
            <img src={assets.profile_icon} alt="profile" className="w-10 "/>
            <ul className=" hidden group-hover:block z-100  absolute top-10 right-0 bg-white shadow border  border-gray-200 py-2.5 w-30 rounded-md text-sm md:z-[999]">
              <li onClick={()=>navigate("/my-orders")} className="p-1.5 pl-3 hover:bg-primary/10  cursor-pointer ">MyOrders</li>
              <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10  cursor-pointer ">Logout</li>
            </ul>
            </div>)}
        </div>

        
        <div className="flex items-center gap-3 md:hidden">
          <img src={assets.cart_icon} onClick={()=>navigate("/cart")} alt="cart_icon" className="w-6 h-6"/>
          <img src={assets.menu_icon} alt="Menu" onClick={()=>setOpen(!open)}/>
        </div>

        {/* Mobile Menu */}
        <div className={`${open ? 'flex' : 'hidden'} absolute z-50 top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>
        {user &&  <NavLink to="/contacts" onClick={() => setOpen(false)}>
            Myorders
          </NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
         {!user ? (<button onClick={()=>{setOpen(false); setShowUserLogin(true)}} className="bg-primary cursor-pointer text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Login
          </button>):
          (
            <button onClick={()=>{setOpen(false);logout()}} className="bg-primary text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Logout
          </button>
          ) } 
        </div>
      </nav>
  );
};
export default Navbar;
