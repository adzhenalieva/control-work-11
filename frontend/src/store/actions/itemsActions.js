import axios from "../../axios-api";

export const FETCH_ITEMS_SUCCESS ='FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const CREATE_ITEM_SUCCESS = "CREATE_ITEMS_SUCCESS";
export const CREATE_ITEM_FAILURE = "CREATE_ITEMS_FAILURE";

export const fetchItemsSuccess = items => {
    return {type: FETCH_ITEMS_SUCCESS, items};
};
export const fetchItemsFailure = error => {
    return {type: FETCH_ITEMS_FAILURE, error};
};

export const createItemSuccess = () => ({type: CREATE_ITEM_SUCCESS});
export const createItemFailure = error => {
    return {type: CREATE_ITEM_FAILURE, error};
};

export const fetchProducts = () => {
    return dispatch => {
        return axios.get('/items').then(
            response => dispatch(fetchItemsSuccess(response.data)),
            error => dispatch(fetchItemsFailure(error))
        );
    };
};

export const createProducts = itemData => {
    return dispatch => {
        return axios.post('/items', itemData).then(
            () => dispatch(createItemSuccess()),
            error => dispatch(createItemFailure(error))
        );
    };
};