import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Page from '../../../../components/page'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { useRouter } from 'next/router'

function Chapter() {
  const router = useRouter()
  const { id, chapterId } = router.query
  const [catalog, setCatalog] = useState({})
  const [chapter, setChapter] = useState({})
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCatalog() {
      const ret = await axios(`${process.env.apiHost}/catalog/${id}`)
      setCatalog(ret.data[0])
    }
    fetchCatalog()
  }, [])

  useEffect(() => {
    async function fetchChapter() {
      const ret = await axios(`${process.env.apiHost}/catalog/${id}/chapter/${chapterId}`)
      setChapter(ret.data)
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
      {chapter?.prev && (
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
    </div>
  );
}

export default Chapter
