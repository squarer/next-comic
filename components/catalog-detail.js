import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Image from 'material-ui-image'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    display: 'flex',
    '@media (max-width: 500px)' : {
      flexDirection: 'column'
    }
  },
  image: {
    minWidth: 196,
    minHeight: 150,
    '@media (max-width: 500px)': {
      height: 150
    }
  },
  content: {
    flexGrow: 1
  }
}))

export default function CatalogDetail({ catalog, loading }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.image}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" height="100%" />
        ) : (
          <Image
            src={catalog?.thumbnailURL || 'failover-url'}
            animationDuration={1500}
            disableSpinner
            cover={true}
            style={{height: '100%', paddingTop: 0}}
          />
        )}
      </div>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="subtitle1">
          {loading ? <Skeleton width="150px" /> : catalog?.title}
        </Typography>
        <Typography variant="button" display="block" style={{ marginBottom: 10 }} variant="caption">
          {loading ? <Skeleton width="100px" /> : `作者: ${catalog?.author}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {loading ? (
            <React.Fragment>
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="80%" />
            </React.Fragment>
          ) : catalog?.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
