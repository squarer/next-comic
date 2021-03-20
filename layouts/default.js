import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
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
import Popover from '@material-ui/core/Popover'
import MoreIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 16,
  },
  button: {
    minWidth: 42,
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
    cursor: 'pointer',
  },
  space: {
    flexGrow: 1,
  },
  popoverContent: {
    maxWidth: 300,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  }
}))

function Default ({ children }) {
  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'categories-popover' : undefined

  useEffect(() => {
    async function fetch () {
      const ret = await axios(`${process.env.apiHost}/category`)
      setCategories(ret.data || [])
    }
    fetch()
  }, [])

  const categoryNodes = categories.map((v, i) =>
    <Button onClick={() => { router.push(`/?category=${v}`); handleClose(); }} color="inherit" className={classes.button} key={i}>{v.slice(0, 2)}</Button>
  )

  return (
    <React.Fragment>
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography onClick={() => router.push('/')} variant="h6" className={classes.title}>
            305
          </Typography>
          <div className={classes.space} />
          <Hidden smDown>
            <Box>
              {categoryNodes}
            </Box>
          </Hidden>
          <Box>
            <Hidden mdUp>
              <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
                <MoreIcon />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.popoverContent}>
                  {categoryNodes}
                </div>
              </Popover>
            </Hidden>
            <IconButton color="inherit">
              <RestoreIcon />
            </IconButton>
            <IconButton color="inherit">
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.root}>
        {children}
      </Container>
    </React.Fragment>
  )
}

export default Default
