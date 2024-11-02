import actionTypes from "../actions/actionTypes";

const initState = {
    active: ""
}


const stateReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.STATE:
            return ({
                ...state,
                active: action?.data,
            })
        default:
            return state;
    }
}

export default stateReducer
