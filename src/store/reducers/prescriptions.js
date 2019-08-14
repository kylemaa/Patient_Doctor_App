import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    prescriptions: [],
    error: null,
    loading: false
};

const getPrescriptionListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getPrescriptionListSuccess = (state, action) => {
    return updateObject(state, {
        prescriptions: action.prescriptions,
        error: null,
        loading: false
    });
};

const getPrescriptionListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRESCRIPTION_LIST_START:
            return getPrescriptionListStart(state, action);
        case actionTypes.GET_PRESCRIPTION_LIST_SUCCESS:
            return getPrescriptionListSuccess(state, action);
        case actionTypes.GET_PRESCRIPTION_LIST_FAIL:
            return getPrescriptionListFail(state, action);
        default:
            return state;
    }
};

export default reducer;
