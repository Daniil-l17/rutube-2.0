'use client';

import { memo } from 'react';
import { IoMdSearch } from 'react-icons/io';
export const Search = memo(() => {
  
  return (
    <div className="cursor-pointer bg-[#222222] max-xl:w-[530px] max-lg:w-[350px]  flex justify-between items-center w-[700px] px-6 rounded-2xl py-3">
      <input type="text" className='w-[70%]' placeholder="Найти...." />
      <IoMdSearch className=' text-xl' />
    </div>
  );
})
