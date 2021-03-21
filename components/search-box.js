import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Input from './input'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBox () {
  const [keyword, setKeyword] = useState('')
  const [catalogs, setCatalogs] = useState([])
  const handleChange = event => {
    setKeyword(event.target.value)
  }

  const handleKeyUp = event => {
    if (event.keyCode === 13) {
      submit()
    }
  }

  const router = useRouter()
  const submit = () => {
    router.push(`/?title=${keyword.trim()}`)
  }

  const fetchCatalogsByKeyword = useDebouncedCallback(async () => {
    if (keyword.trim().length) {
      const ret = await axios(`${process.env.apiHost}/catalog?title=${keyword}&limit=5`)
      setCatalogs(ret.data)
    }
  }, 300)

  useEffect(() => {
    fetchCatalogsByKeyword()
    if (!keyword.trim().length) {
      setCatalogs([])
    }
  }, [keyword])

  const change = (event) => {
    setKeyword(event.target.textContent)
  }

  return (
    <Autocomplete
      value={keyword}
      freeSolo
      disableClearable
      id="search-box"
      onChange={change}
      options={catalogs.map(v => v.title)}
      renderInput={(params) => <Input {...params} onChange={handleChange} onKeyUp={handleKeyUp} onSubmit={submit} />}
    />
  );
}
