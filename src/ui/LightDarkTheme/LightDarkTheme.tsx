import React, { useEffect, useState } from 'react'
import {Switch} from "@nextui-org/react";
import { SunIcon } from '@/images/Icons/SunIcon';
import { MoonIcon } from '@/images/Icons/MoonIcon';

export const LightDarkTheme = () => {
  const [theme,setTheme] = useState(false)
  const click = () => {
    setTheme(theme => !theme)
  }


  useEffect(() => {
    theme ? document.body.classList.add('darkTheme') : document.body.classList.remove('darkTheme')
  },[theme])
  
  return (
    <Switch
      defaultSelected
      size="lg"
      color='secondary'
      className=' !text-[#939393] '
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onClick={click}
      onKeyUp={e => e.code === 'Space' && setTheme(prev => !prev)}
      >
    </Switch>
  )
}

