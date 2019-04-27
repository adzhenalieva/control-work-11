import axios from '../../axios-api';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});

export const fetchCategoriesFailure = error => ({type: FETCH_CATEGORIES_FAILURE, error});

export const fetchCategories = () => {
    return dispatch => {
        return axios.get('/categories').then(
            response => dispatch(fetchCategoriesSuccess(response.data)),
            error => dispatch(fetchCategoriesFailure(error))
        );
    };
};