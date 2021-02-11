import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 200,
  },
})

export default function Catalog({ catalog }) {
  catalog.thumbnailURL = catalog.thumbnailURL || ''
  const classes = useStyles()
  const router = useRouter()

  return (
    <Card onClick={() => router.push(`/catalog/${catalog.ID}`)} className={classes.root}>
      <CardActionArea>
        <Image
          src={catalog.thumbnailURL}
          animationDuration={1500}
          disableSpinner
          cover={true}
        />
        <CardContent>
          <Typography gutterBottom align="center" variant="subtitle2">
            {catalog.title}
          </Typography>
          <Typography style={{ height: 60, overflowY: 'hidden' }} gutterBottom variant="body2" color="textSecondary">
            {catalog.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
