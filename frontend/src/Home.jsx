import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import { fade, makeStyles } from '@material-ui/core/styles'
import { setAuthToken } from './actions/index'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import debounce from 'lodash/debounce'
import { queryImages } from './services/images'

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
}))


function Home({ authToken, setAuthToken }) {
  const classes = useStyles()
  let history = useHistory()

  const [searching, setSearching] = useState(false)

  function logout() {
    Cookies.remove('userToken')
    setAuthToken(false)
    history.push('/login')
  }

  let debouncedSearch
  function searchImage(event) {
    /* signal to React not to nullify the event object */
    event.persist();

    if (!debouncedSearch) {
      debouncedSearch =  debounce(() => {
        setSearching(true)

        let query = event.target.value;
        queryImages(authToken, query)
        .then(({ data }) => {
          debugger;
        })
        .catch(({ response }) => {
          debugger;
        })
        .finally(() => {
          setSearching(false)
        })
      }, 500);
    }

    debouncedSearch();
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
    </Container>
  )
}

const mapStateToProps = ({ authToken, authLoaded }) => {
  return {
    authToken
  }
}
export default connect(
  mapStateToProps,
  { setAuthToken }
)(Home)
