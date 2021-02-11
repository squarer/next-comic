import React from 'react'
import Paper from '@material-ui/core/Paper'

export default function Page({ image, style }) {
  return (
    <Paper style={style} elevation={1}>
      <img style={{ width: '100%', minHeight: 300, border: 'none' }} src={image} />
    </Paper>
  )
}
