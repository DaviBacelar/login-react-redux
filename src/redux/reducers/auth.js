export default (state = {}, action) => {
    switch (action.type) {
     case 'AUTH':
      return {
       result: action.payload
      }
     default:
      return state
    }
}