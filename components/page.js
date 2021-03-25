import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%',
    minHeight: 300,
    border: 'none',
  },
}))

export default function Page({ image, className }) {
  const classes = useStyles()

  return (
    <Paper className={className} elevation={1}>
      <img className={classes.image} src={image} />
    </Paper>
  )
}
