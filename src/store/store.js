import {createStore} from 'redux'


const initialState ={
    data: {},
}

const moviesReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'moviesData':
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state
    }
}

const store = createStore(moviesReducer)

export default store