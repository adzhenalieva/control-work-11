import {
    CREATE_ITEM_FAILURE,
    CREATE_ITEM_SUCCESS, DELETE_ITEM_FAILURE, DELETE_ITEM_SUCCESS,
    FETCH_ITEMS_FAILURE,
    FETCH_ITEMS_SUCCESS, FETCH_ONE_ITEM_FAILURE, FETCH_ONE_ITEM_SUCCESS
} from "../actions/itemsActions";


const initialState = {
    items: [],
    fetchError: null,
    createError: null,
    deleteError: null,
    oneItem: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.items,
                fetchError: null
            };
        case FETCH_ITEMS_FAILURE:
            return {
                ...state,
                fetchError: action.error
            };
        case FETCH_ONE_ITEM_SUCCESS:
            return {
                ...state,
                oneItem: action.item,
                fetchError: null
            };
        case FETCH_ONE_ITEM_FAILURE:
            return {
                ...state,
                fetchError: action.error
            };
        case CREATE_ITEM_SUCCESS:
            return {
                ...state,
                createError: null
            };
        case CREATE_ITEM_FAILURE:
            return {
                ...state,
                createError: action.error
            };
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                deleteError: null
            };
        case DELETE_ITEM_FAILURE:
            return {
                ...state,
                deleteError: action.error
            };
        default:
            return state;
    }
};

export default itemsReducer;