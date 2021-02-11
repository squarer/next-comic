import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import CatalogDetail from '../../../components/catalog-detail'
import Chapter from '../../../components/chapter'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  root: {
    '@media (max-width: 500px)' : {
      padding: 0,
    }
  },
  grid: {
    marginTop: 32
  }
}))

function Catalog() {
  const classes = useStyles()
  const router = useRouter()
  const [catalog, setCatalog] = useState({})
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [chaptersLoading, setChaptersLoading] = useState(true)

  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true)
      const ret = await axios(`${process.env.apiHost}/catalog/${router.query.id}`)
      setCatalog(ret.data[0])
      setLoading(false)
    }
    fetchCatalog()
  }, [])

  useEffect(() => {
    async function fetchChapters() {
      setChaptersLoading(true)
      const ret = await axios(`${process.env.apiHost}/catalog/${router.query.id}/chapter`)
      setChapters(ret.data)
      setTimeout(() => {
        setChaptersLoading(false)
      }, 300)
    }
    fetchChapters()
  }, [])

  const chapterNodes = chapters.map((v, i) => (
    <Grid style={{ padding: 8 }} key={i} item>
      { v && <Chapter chapter={v} href={`/catalog/${router.query.id}/chapter/${v._id}`} /> }
    </Grid>
  ))

  return (
    <React.Fragment>
      <Container maxWidth="sm" className={classes.root}>
        <CatalogDetail loading={loading} catalog={catalog} />
      </Container>
      <Container maxWidth="md" className={classes.root}>
        <Grid justify="center" container spacing={3} className={classes.grid}>
          {chaptersLoading && <CircularProgress style={{ position: 'absolute', marginTop: '10%' }} />}
          {chapterNodes}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export function getServerSideProps (context) {
  return {
    props: { params: context.params }
  }
}

export default Catalog
