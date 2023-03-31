import { createStore } from "redux";

const initialstate = {validauth : false};

const reducer = (state = initialstate,action) => {
    if (action.type === "setTrue") {
        return {
            ...state,
            validauth : true
        }
    }
    if(action.type === "setFalse") {
        return {
            ...state,
            validauth : false
        }
    }
    return state
}

const store = createStore(reducer)
export default store