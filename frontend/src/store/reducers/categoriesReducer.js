import {FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS} from "../actions/categoriesActions";

const initialState = {
    categories: [],
    error: null
};


const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories,
                error: null
            };
        case FETCH_CATEGORIES_FAILURE:
            return {...state, error: action.error};

        default:
            return state;
    }
};

export default categoriesReducer;