import axios from "axios";
import * as actionTypes from "./actionTypes";

const getPrescriptionListStart = () => {
    return {
        type: actionTypes.GET_PRESCRIPTION_LIST_START
    };
};

const getPrescriptionListSuccess = prescriptions => {
    return {
        type: actionTypes.GET_PRESCRIPTION_LIST_SUCCESS,
        prescriptions
    };
};

const getPrescriptionListFail = error => {
    return {
        type: actionTypes.GET_PRESCRIPTION_LIST_FAIL,
        error: error
    };
};

export const getPrescriptions = token => {
    return dispatch => {
        dispatch(getPrescriptionListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get("http://127.0.0.1:8000/prescriptions/")
            .then(res => {
                const prescriptions = res.data;
                dispatch(getPrescriptionListSuccess(prescriptions));
            })
            .catch(err => {
                dispatch(getPrescriptionListFail());
            });
    };
};

