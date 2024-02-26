import React, { useState } from 'react'
import {Switch} from "@nextui-org/react";
import { SunIcon } from '@/images/Icons/SunIcon';
import { MoonIcon } from '@/images/Icons/MoonIcon';

export const LightDarkTheme = () => {
  const [theme,setTheme] = useState(true)
  const click = () => {
    setTheme(theme => !theme)
    theme ? document.body.classList.add('darkTheme') : document.body.classList.remove('darkTheme')
  }
  return (
    <Switch
      defaultSelected
      size="lg"
      color='secondary'
      className=' !text-[#939393] '
      startContent={<SunIcon />}
      onClick={click}
      endContent={<MoonIcon />}
    >
      <p className='!text-[#939393]'>{theme ? 'темная тема' : 'светлая тема'}</p>
    </Switch>
  )
}
