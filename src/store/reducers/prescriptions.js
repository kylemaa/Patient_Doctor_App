import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    prescriptions: [],
    currentPrescription: {},
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

const getPrescriptionDetailStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getPrescriptionDetailSuccess = (state, action) => {
    return updateObject(state, {
        currentPrescription: action.prescription,
        error: null,
        loading: false
    });
};

const getPrescriptionDetailFail = (state, action) => {
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

        case actionTypes.GET_PRESCRIPTION_DETAIL_START:
            return getPrescriptionDetailStart(state, action);
        case actionTypes.GET_PRESCRIPTION_DETAIL_SUCCESS:
            return getPrescriptionDetailSuccess(state, action);
        case actionTypes.GET_PRESCRIPTION_DETAIL_FAIL:
            return getPrescriptionDetailFail(state, action);
        default:
            return state;
    }
};

export default reducer;
