import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    prescriptions: [],
    currentPrescription: {},
    error: null,
    loading: false,
    Title: null,
    Medicine: null,
    Quantity: null,
    Direction: null,
    Recipient: null,
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

const postPrescriptionDetailStart = (state, action) => {
    return updateObject(state, {
        Title: action.p.Title,
        Medicine: action.p.Medicine,
        Quantity: action.p.Quantity,
        Direction: action.p.Direction,
        Recipient: action.p.Recipient,
        error: null,
        loading: true
    });
};

const postPrescriptionDetailSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const postPrescriptionDetailFail = (state, action) => {
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

        case actionTypes.POST_PRESCRIPTION_DETAIL_START:
            return postPrescriptionDetailStart(state, action);
        case actionTypes.POST_PRESCRIPTION_DETAIL_SUCCESS:
            return postPrescriptionDetailSuccess(state, action);
        case actionTypes.POST_PRESCRIPTION_DETAIL_FAIL:
            return postPrescriptionDetailFail(state, action);

        default:
            return state;
    }
};

export default reducer;
