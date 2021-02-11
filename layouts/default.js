import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Link from '../src/Link'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 16,
  },
  button: {
    minWidth: 48,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 48
  },
  title: {
    marginLeft: 16,
    marginRight: 16,
    flexGrow: 1,
    cursor: 'pointer',
  },
}))

function Default ({ children }) {
  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetch () {
      const ret = await axios(`${process.env.apiHost}/category`)
      setCategories(ret.data || [])
    }
    fetch()
  }, [])

  const categoryNodes = categories.map((v, i) =>
    <Button onClick={() => router.push(`/?category=${v}`)} color="inherit" className={classes.button} key={i}>{v.slice(0, 2)}</Button>
  )

  return (
    <React.Fragment>
      <AppBar color="white" position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography onClick={() => router.push('/')} variant="h6" className={classes.title}>
            305
          </Typography>
          {categoryNodes}
          <IconButton color="inherit">
            <RestoreIcon />
          </IconButton>
          <IconButton color="inherit" style={{ marginRight: 32 }}>
            <FavoriteBorderIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.root}>
        {children}
      </Container>
    </React.Fragment>
  )
}

export default Default
