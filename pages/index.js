import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Catalog from '../components/catalog'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grid: {
    padding: '20px!important',
    '@media (max-width: 500px)': {
      padding: '12px!important'
    }
  },
  loadMore: {
    height: 48,
  }
}))

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const PER_PAGE = 30

function Index() {
  const classes = useStyles()
  const [catalogs, setCatalogs] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [skip, setSkip] = useState(PER_PAGE)
  const [moreLoading, setMoreLoading] = useState(false)
  const router = useRouter()
  const params = new URLSearchParams(location.search)
  const category = params.get('category')
  const title = params.get('title')
  params.set('limit', PER_PAGE + 1)

  const loadMore = async () => {
    setMoreLoading(true)
    params.set('skip', skip)
    const ret = await axios(`${process.env.apiHost}/catalog?${params.toString()}`)
    setCatalogs(catalogs.concat(ret.data.slice(0, 30)))
    setSkip(skip + PER_PAGE)
    setCount(ret.data.length)
    setMoreLoading(false)
  }

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      const ret = await axios(`${process.env.apiHost}/catalog?${params.toString()}`)
      setCatalogs(ret.data.slice(0, 30))
      setSkip(PER_PAGE)
      setCount(ret.data.length)
      setLoading(false)
    }
    fetch()
  }, [category, title])

  const catalogNodes = (loading ? Array.from(new Array(10)) : catalogs).map((v, i) => (
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
    <React.Fragment>
      <Grid container spacing={3}>
        {catalogNodes}
      </Grid>
      <Box mt={4} px={1}>
        {count > PER_PAGE && (
          <Button disabled={moreLoading} onClick={loadMore} className={classes.loadMore} variant="outlined" fullWidth>
            {moreLoading ? '載入中' : '載入更多內容'}
          </Button>
        )}
      </Box>
    </React.Fragment>
  );
}

export default Index
