import React from 'react'

// Redux
import { connect } from 'react-redux'

// Services
import { markFavorite, removeFavorite } from './services/images'

// Libraries
import { makeStyles } from '@material-ui/core/styles'

// Library Components
import Link from '@material-ui/core/Link'
import {
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteOutlinedIcon
} from '@material-ui/icons'


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

function Image({ image, setError, toggleImageFavorite, authToken }) {
  const classes = useStyles()

  function toggleFavorite(event) {
    event.preventDefault()
    setError(null)
    const toggleValue = !image.favorite
    const apiCall = toggleValue ? markFavorite : removeFavorite

    apiCall(authToken, image)
    .then(({ data }) => {
      toggleImageFavorite(image, toggleValue, data.id)
    })
    .catch(({ response }) => {
      setError('Something went wrong. Try again later')
    })
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

const mapStateToProps = ({ authToken }) => {
  return {
    authToken
  }
}
export default connect(
  mapStateToProps,
  null
)(Image)
