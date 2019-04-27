import axios from "../../axios-api";
import {push} from 'connected-react-router';
import {NotificationManager} from 'react-notifications';

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const FETCH_ONE_ITEM_SUCCESS = 'FETCH_ONE_ITEM_SUCCESS';
export const FETCH_ONE_ITEM_FAILURE = "FETCH_ONE_ITEM_FAILURE";

export const CREATE_ITEM_SUCCESS = "CREATE_ITEMS_SUCCESS";
export const CREATE_ITEM_FAILURE = "CREATE_ITEMS_FAILURE";

export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

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

export const deleteItemSuccess = () => ({type: DELETE_ITEM_SUCCESS});
export const deleteItemFailure = error => {
    return {type: DELETE_ITEM_FAILURE, error};
};

export const fetchOneItemSuccess = item => {
    return {type: FETCH_ONE_ITEM_SUCCESS, item};
};
export const fetchOneItemFailure = error => {
    return {type: FETCH_ONE_ITEM_FAILURE, error};
};

export const fetchItems = id => {
    return dispatch => {
        let queryParams = null;
        if (id) {
            queryParams = '/?category=';
            return axios.get('/items' + queryParams + id).then(
                response => dispatch(fetchItemsSuccess(response.data)),
                error => dispatch(fetchItemsFailure(error))
            );
        }
        return axios.get('/items').then(
            response => dispatch(fetchItemsSuccess(response.data)),
            error => dispatch(fetchItemsFailure(error))
        );
    };
};

export const fetchOneItem = id => {
    return dispatch => {
        return axios.get('/items/' + id).then(
            response => dispatch(fetchOneItemSuccess(response.data)),
            error => dispatch(fetchOneItemFailure(error))
        );
    };
};


export const deleteItem = id => {
    return (dispatch, getState) => {
        let token = getState().user.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.delete('/items/' + id, header).then(
            () => {
                dispatch(deleteItemSuccess());
                NotificationManager.success('Item deleted successfully');
                dispatch(push('/'));

            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(deleteItemFailure(error.response.data));
                    NotificationManager.error(error.response.data.message);
                } else {
                    dispatch(deleteItemFailure({global: 'No connection'}))
                }
            }
        );
    };
};


export const createItem = itemData => {
    return (dispatch, getState) => {
        let token = getState().user.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.post('/items', itemData, header).then(
            () => {
                dispatch(createItemSuccess());
                NotificationManager.success('Item published successfully');
                dispatch(push('/'))
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(createItemFailure(error.response.data));
                } else {
                    dispatch(createItemFailure({global: 'No connection'}))
                }
            }
        );
    };
};