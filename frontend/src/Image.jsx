import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  favorite: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  favoriteIcon: {
    color: 'white',
  },
  source: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    color: 'white',
  }
}))


function Image({ image, toggleImageFavorite }) {
  const classes = useStyles()

  function toggleFavorite(event) {
    event.preventDefault()
    toggleImageFavorite(image)
  }

  return (
    <div className={classes.container}>
      <Link
        href='#'
        className={classes.favorite}
        onClick={toggleFavorite}
      >
        {image.favorite
          ? <FavoriteIcon color='secondary' />
          : <FavoriteOutlinedIcon className={classes.favoriteIcon} />
        }
      </Link>

      <img key={image.id} src={image.url} alt='' />

      <Link
        href={image.origin_url}
        target='_blank'
        className={classes.source}
        variant='caption'
      >
        View Source
      </Link>
    </div>

  )
}

export default Image
