const baseConfigState = {
    blackout: false,
    blackoutComponent: null,
}


const SET_BLACKOUT = "SET_BLACKOUT";
const UNSET_BLACKOUT = "UNSET_BLACKOUT";


const baseConfigReducer = (state=baseConfigState, action) => {
    switch (action.type) {
        case SET_BLACKOUT: {
            return {...state, blackoutComponent: action.fullComponent, blackout: true}
        }
        case UNSET_BLACKOUT: {
            return {...state, blackoutComponent: null, blackout: false}
        }
        default: return state
    }
}


export const setBlackout = (fullComponent) => ({type: SET_BLACKOUT, fullComponent})
export const unsetBlackout = () => ({type: UNSET_BLACKOUT})


export default baseConfigReducer
