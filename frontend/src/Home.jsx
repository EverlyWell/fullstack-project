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
import {
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Pets as PetsIcon,
  Search as SearchIcon,
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
    flexDirection: 'row',
    padding: theme.spacing(0, 2),
    justifyContent: 'space-between',
  },
  searchWrapper: {
    padding: theme.spacing(1),
    width: '40%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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
  },
  loadMore: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}))


function Home({ authToken, setAuthToken }) {
  const classes = useStyles()
  let history = useHistory()

  const [searching, setSearching] = useState(false)
  const [errorMessage, setError] = useState(null)
  const [images, setImages] = useState([])
  const [currentQuery, setQuery] = useState(null)
  const [currentPage, setPage] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)

  function logout() {
    Cookies.remove('userToken')
    setAuthToken(false)
    history.push('/login')
  }

  function getImages(query, page) {
    setError(null)
    setSearching(true)

    queryImages(authToken, query, page)
      .then(({ data }) => {
        if(page === 1) {
          setImages(data)
        } else {
          setImages([
            ...images,
            ...data
          ])
        }
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
      getImages(null, 1)
    }
  }
  getInitialImages()

  let debouncedSearch
  function searchImage(event) {
    /* signal to React not to nullify the event object */
    event.persist();

    if (!debouncedSearch) {
      debouncedSearch =  debounce(() => {
        let query = event.target.value;
        setQuery(query)
        setPage(1)
        getImages(query, 1)
      }, 500);
    }

    debouncedSearch();
  }

  function loadMoreImages() {
    const newPage = currentPage + 1
    setPage(newPage)
    getImages(currentQuery, newPage)
  }

  function toggleImageFavorite(changedImage, favoriteValue, id) {
    let newImages = images.map((image) => {
      if(image.source_id === changedImage.source_id) {
        return {
          ...image,
          id,
          favorite: favoriteValue
        }
      } else {
        return image
      }
    })
    setImages(newImages)
  }

  let imagesList = images.map((image) =>
    <Image
      key={image.source_id}
      image={image}
      toggleImageFavorite={toggleImageFavorite}
      setError={setError}
    />
  )

  return (
    <Container data-testid="home-page">
      <AppBar position="fixed" className={classes.appBar}>
        <Grid container direction="row" className={classes.titleNav}>
          <Typography className={classes.title} variant="button" noWrap>
            <HomeIcon className={classes.titleIcon} />
            Home
          </Typography>
          <Button
            href="/favorites"
            color="inherit"
            className={classes.navLink}
            startIcon={<FavoriteIcon />}
          >
            Favorites
          </Button>
        </Grid>

        <div className={classes.searchWrapper}>
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
        </div>

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

      <Button
        variant="contained"
        color="secondary"
        size="large"
        disabled={searching}
        startIcon={searching
         ? <CircularProgress color="inherit" size={20} />
         : <PetsIcon />
        }
        className={classes.loadMore}
        onClick={loadMoreImages}
      >
        Load More

      </Button>
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
