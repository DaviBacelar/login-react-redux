//Reducer
const auth = (state = false, action) => {
    switch (action.type) {
        case "AUTH":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default auth