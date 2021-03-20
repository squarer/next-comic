import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Page from '../../../../components/page'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

function Chapter() {
  const router = useRouter()
  const { id, chapterId } = router.query
  const [catalog, setCatalog] = useState({})
  const [chapter, setChapter] = useState({})
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [chapterloading, setChapterLoading] = useState(true)

  useEffect(() => {
    async function fetchCatalog() {
      const ret = await axios(`${process.env.apiHost}/catalog/${id}`)
      setCatalog(ret.data[0])
    }
    fetchCatalog()
  }, [])

  useEffect(() => {
    async function fetchChapter() {
      setChapterLoading(true)
      const ret = await axios(`${process.env.apiHost}/catalog/${id}/chapter/${chapterId}`)
      setChapter(ret.data)
      setChapterLoading(false)
    }
    fetchChapter()
  }, [chapterId])

  useEffect(() => {
    async function fetchPages() {
      setLoading(true)
      setPages([])
      const ret = await axios(`${process.env.apiHost}/catalog/${id}/chapter/${chapterId}/page`)
      setPages(ret.data)
      setLoading(false)
    }
    fetchPages()
  }, [chapterId])

  const baseUrl = `/catalog/${id}`
  const prevUrl = `${baseUrl}/chapter/${chapter?.prev?._id}`
  const nextUrl = `${baseUrl}/chapter/${chapter?.next?._id}`
  const handlePrev = event => {
    event.preventDefault()
    router.push(prevUrl)
  }
  const handleNext = event => {
    event.preventDefault()
    router.push(nextUrl)
  }
  const handleBack = event => {
    event.preventDefault()
    router.push(baseUrl)
  }

  const pageNodes = pages.map((v, i) => (
    <Page image={v} key={i} style={{ marginBottom: 20, padding: 16 }} />
  ))

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {chapterloading || (
        <Breadcrumbs style={{ marginBottom: 32 }} aria-label="breadcrumb">
          {chapter?.prev && <Link color="inherit" href={prevUrl} onClick={handlePrev}>上一話({chapter?.prev?.title})</Link>}
          <Link color="inherit" href={baseUrl} onClick={handleBack}>
            <div>{catalog.title}</div>
          </Link>
          <Typography color="textPrimary">{chapter?.title}</Typography>
          {chapter?.next && <Link color="inherit" href={nextUrl} onClick={handleNext}>下一話({chapter?.next?.title})</Link>}
        </Breadcrumbs>
      )}
      {pageNodes}
      {loading || (
        chapter?.next ? (
          <Button color="primary" onClick={handleNext} style={{ width: '100%', minHeight: 42, marginTop: 16 }} variant="outlined">下一話</Button>
        ) : (
          <Alert variant="outlined" icon={false} style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }} severity="info">已是最新章節</Alert>
        )
      )}
    </div>
  );
}

export default Chapter
