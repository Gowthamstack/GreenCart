import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext, useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const ref = React.useRef(null);
  const {navigate,axios}=useAppContext();
  const [open, setOpen] = useState(false);
  const {user,setUser}=useAppContext();
  const {seller,isSeller}=useAppContext();
  const {showUserLogin,setShowUserLogin}=useAppContext();

  const logout=async()=>{
    try {
      const {data}=await axios.get('/api/user/logout');
      if(data.success){
        toast.success(data.message)
        setUser(null);
        navigate('/');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message) 
    }
  }

  return (
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
            bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
        }`}
      >
        {/* Logo */}
        <NavLink to="/" onClick={()=>setOpen(false)} className="flex items-center font-bold">
            <img src="/favicon.svg" alt="" />
          <h1 className="text-2xl text-black">reenCart</h1> 
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex  items-center gap-4 lg:gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <input type="text" placeholder="search Products"
            className="border outline-0 px-4 py-1 text-sm font-light rounded-full cursor-pointer 
              text-black
             transition-all"
          />
          
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <div>
          <img src={assets.cart_icon} onClick={()=>navigate("/cart")} alt="cart_icon" className="w-6 h-6"/>
          {/* <button className="absolute top-3 right-63 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full
          ">7</button> */}
          </div>
          {!user ?(<button onClick={()=>setShowUserLogin(true)} className="bg-primary hover:bg-secondary text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
            Login
          </button>):(<div className="relative group cursor-pointer">
            <img src={assets.profile_icon} alt="profile" className="w-10 "/>
            <ul className="hidden group-hover:block  absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li onClick={()=>navigate("/my-orders")} className="p-1.5 pl-3 hover:bg-primary/10  cursor-pointer ">MyOrders</li>
              <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10  cursor-pointer ">Logout</li>
            </ul>
            </div>)}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <img src={assets.menu_icon} alt="Menu" onClick={()=>setOpen(true)}/>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

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
         {!user ? (<button onClick={()=>{setOpen(false); setShowUserLogin(true)}} className="bg-primary text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Login
          </button>):
          (
            <button onClick={()=>{logout}} className="bg-primary text-white px-8 py-2.5 rounded-full transition-all duration-500">
            Logout
          </button>
          ) } 
        </div>
      </nav>
  );
};
export default Navbar;


{/*
 <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">3</button>
                </div>

                <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                    Login
                </button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <a href="#" className="block">Home</a>
                <a href="#" className="block">About</a>
                <a href="#" className="block">Contact</a>
                <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Login
                </button>
            </div>
*/}