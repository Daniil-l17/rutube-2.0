import { Ivideo } from '@/types/Ivideo'
import { Fragment, memo } from 'react'

export const SearchHeader = memo(({searchDate}:{searchDate:Ivideo[] | undefined}) => {
  return (
    <Fragment>
      {searchDate?.map(el => 
        <h1>{el.name}</h1>
        )}
    </Fragment>
  )
})
