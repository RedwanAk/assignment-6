import Image from 'next/image';
import React from 'react';
import logo from "@/app/assets/logo.png";

const Footer = () => {
    return (
        <footer className=" sm:footer-horizontal bg-base-300 text-base-content p-4">
  <aside className="flex justify-between items-center">
    <div className='flex items-center gap-2'>
      <Image src={logo} alt="Logo" width={20} height={20} />
      <p className="font-bold">FITLOG</p>
    </div>
    
    <p className="text-[#6B7280]">Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  
  </aside>

</footer>
    );
};

export default Footer;