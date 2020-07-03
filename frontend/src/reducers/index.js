const data = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.token
      }
    case 'SET_AUTH_LOADED':
      return {
        ...state,
        authLoaded: action.value
      }
    default:
      return state
  }
}

export default data
