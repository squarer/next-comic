import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Catalog from '../components/catalog'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grid: {
    padding: '20px!important',
    '@media (max-width: 500px)' : {
      padding: '12px!important'
    }
  },
}))

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function Index() {
  const classes = useStyles()
  const [catalogs, setCatalogs] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const category = typeof location !== 'undefined' && new URLSearchParams(location.search).get('category')

  useEffect(() => {
    async function fetch () {
      setLoading(true)
      const ret = await axios(`${process.env.apiHost}/catalog${location.search}`)
      setCatalogs(ret.data || [])
      setLoading(false)
    }
    fetch()
  }, [category])

  const catalogNodes = (loading ? Array.from(new Array(10)) : catalogs).slice(0, 30).map((v, i) => (
    <Grid className={classes.grid} key={i} item md={3} sm={4} xs={6}>
      {v ? (
        <Catalog catalog={v} loading={loading} />
      ) : (
        <React.Fragment>
          <Box mb={1}>
            <Skeleton animation="wave" variant="rect" height={200} />
          </Box>
          <Box mb={0.3} display="flex" justifyContent="center">
            <Skeleton animation="wave" width="60%" height={24} />
          </Box>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="80%" />
        </React.Fragment>
      )}
    </Grid>
  ))
  return (
    <Grid container spacing={3}>
      {catalogNodes}
    </Grid>
  );
}

export default Index
