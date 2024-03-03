'use client';

import { memo } from 'react';
import { IoMdSearch } from 'react-icons/io';
export const Search = memo(({setSearch,search}:{setSearch: (title:string) => void,search:string}) => {
  
  return (
    <div style={{position: 'relative'}} className="cursor-pointer relative bg-[#222222] max-2xl:w-[600px] text-main max-xl:w-[430px] max-lg:w-[350px]  flex justify-between items-center w-[700px] px-6 rounded-2xl py-3">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='w-[70%]' placeholder="Найти...." />
      <IoMdSearch className=' text-xl' />
    </div>
  );
})
