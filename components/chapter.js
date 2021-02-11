import React from 'react'
import { useRouter } from 'next/router'
import Chip from '@material-ui/core/Chip'

export default function Chapter({ chapter, href }) {
  const router = useRouter()
  const handleClick = event => {
    event.preventDefault()
    router.push(href)
  }

  return (
    <Chip size="small" label={chapter.title} variant="outlined" onClick={handleClick} />
  )
}
