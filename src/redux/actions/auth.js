export const auth = () => dispatch => {
    dispatch({
     type: 'AUTH',
     payload: 'auth_result'
    })
   }