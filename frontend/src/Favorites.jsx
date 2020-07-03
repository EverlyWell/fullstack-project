import React, { useState } from 'react'

// Redux
import { connect } from 'react-redux'
import { setAuthToken } from './actions/index'

// Services
import { getFavorites } from './services/images'

// Libraries
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

// Library Components
import {
  AppBar,
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'
import {
  Favorite as FavoriteIcon,
  Home as HomeIcon,
} from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

// Child Components
import Image from './Image'

const useStyles = makeStyles((theme) => ({
  titleNav: {
    width: 'auto',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    backgroundColor: '#f44336',
  },
  titleIcon: {
    marginRight: theme.spacing(1),
  },
  navLink: {
    padding: theme.spacing(0, 2),
  },
  appBar: {
    height: '51px',
    flexDirection: 'row',
    padding: theme.spacing(0, 2),
    justifyContent: 'space-between',
  },
  body: {
    marginTop: theme.spacing(8),
  }
}))


function Home({ authToken, setAuthToken }) {
  const classes = useStyles()
  let history = useHistory()

  const [errorMessage, setError] = useState(null)
  const [images, setImages] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)

  function logout() {
    Cookies.remove('userToken')
    setAuthToken(false)
    history.push('/login')
  }

  function getImages(query) {
    if(!imageLoaded) {
      setImageLoaded(true)
      getFavorites(authToken, query)
        .then(({ data }) => {
          setImages(data)
        })
        .catch(({ response }) => {
          setError('Something went wrong. Try again later')
        })
      }
  }
  getImages()

  function removeImageFromFavorite(changedImage) {
    let newImages = images.filter(image => image.source_id !== changedImage.source_id)
    setImages(newImages)
  }

  let imagesList = images.map((image) =>
    <Image
      key={image.source_id}
      image={image}
      toggleImageFavorite={removeImageFromFavorite}
      setError={setError}
    />
  )

  return (
    <Container data-testid="home-page">
      <AppBar position="fixed" className={classes.appBar}>
        <Grid container direction="row" className={classes.titleNav}>
          <Button
              href="/"
              color="inherit"
              className={classes.navLink}
              startIcon={<HomeIcon />}
            >
              Home
          </Button>
          <Typography className={classes.title} variant="button" noWrap>
            <FavoriteIcon className={classes.titleIcon} />
            Favorites
          </Typography>
        </Grid>

        <Button color="inherit" onClick={logout}>
          Log Out
        </Button>
      </AppBar>

      {errorMessage &&
        <Alert severity="error">{errorMessage}</Alert>
      }

      <Grid
        container
        direction="row"
        justify="space-evenly"
        className={classes.body}
      >
        {imagesList}
      </Grid>
    </Container>
  )
}

const mapStateToProps = ({ authToken }) => {
  return {
    authToken
  }
}
export default connect(
  mapStateToProps,
  { setAuthToken }
)(Home)
