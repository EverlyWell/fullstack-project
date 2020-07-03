import React, { useState } from 'react'

// Redux
import { connect } from 'react-redux'
import { setAuthToken } from './actions/index'

// Services
import { queryImages } from './services/images'

// Libraries
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { fade, makeStyles } from '@material-ui/core/styles'

// Library Components
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputBase,
  Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Alert from '@material-ui/lab/Alert'

// Child Components
import Image from './Image'

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexDirection: 'row',
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 6),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  progress: {
    position: 'absolute',
    right: theme.spacing(2),
    top: 'calc(50% - 10px)',
  },
  body: {
    marginTop: theme.spacing(8),
  }
}))


function Home({ authToken, setAuthToken }) {
  const classes = useStyles()
  let history = useHistory()

  const [searching, setSearching] = useState(false)
  const [errorMessage, setError] = useState(null)
  const [images, setImages] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)

  function logout() {
    Cookies.remove('userToken')
    setAuthToken(false)
    history.push('/login')
  }

  function getImages(query) {
    setError(null)
    queryImages(authToken, query)
      .then(({ data }) => {
        setImages(data)
      })
      .catch(({ response }) => {
        setError('Something went wrong. Try again later')
      })
      .finally(() => {
        setSearching(false)
      })
  }

  function getInitialImages() {
    if(!imageLoaded) {
      setImageLoaded(true)
      getImages(null)
    }
  }
  getInitialImages()

  let debouncedSearch
  function searchImage(event) {
    /* signal to React not to nullify the event object */
    event.persist();

    if (!debouncedSearch) {
      debouncedSearch =  debounce(() => {
        setSearching(true)

        let query = event.target.value;
        getImages(query)
      }, 500);
    }

    debouncedSearch();
  }

  function toggleImageFavorite(changedImage) {
    let newImages = images.map((image) => {
      if(image.id === changedImage.id) {
        return {
          ...image,
          favorite: !image.favorite
        }
      } else {
        return image
      }
    })
    setImages(newImages)
  }

  let imagesList
  if(errorMessage) {
    imagesList = <Alert severity="error">{errorMessage}</Alert>
  } else {
    imagesList = images.map((image) =>
      <Image key={image.id} image={image} toggleImageFavorite={toggleImageFavorite} />
    )
  }

  return (
    <Container data-testid="home-page">
      <AppBar position="fixed" className={classes.appBar}>
        <Typography className={classes.title} variant="h6" noWrap>
          Home
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search images..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={searchImage}
          />

          {searching &&
            <CircularProgress
            className={classes.progress}
            color="inherit"
            size={20}
          />
          }
        </div>

        <Button color="inherit" onClick={logout}>
          Log Out
        </Button>
      </AppBar>

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
