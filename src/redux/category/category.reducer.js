import categoryTypes from "./category.types"

const INITIAL_STATE = {
    addCategoryPending: false,
    addCategoryError: null,
    addedCategoryName: null,

    defaultCategories: null,
    fetchDefaultCategoriesPending: false,
    fetchDefaultCategoriesError: null,
}

const categoryRedcuer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case categoryTypes.ADD_CATEGORY_PENDING:
            return {...state, addCategoryPending: true}
        case categoryTypes.ADD_CATEGORY_SUCCESS:
            return {
                ...state, 
                addCategoryPending: false, 
                addedCategoryName: action.payload,
                addCategoryError: null
            }
        case categoryTypes.ADD_CATEGORY_ERROR:      
            return {...state, addCategoryPending: false, addCategoryError: action.payload}

        //  FETCH DEFAULT CATEGORIES  
        case categoryTypes.FETCH_DEFAULT_CATEGORIES_PENDING:
            return {...state, fetchDefaultCategoriesPending: true}
        case categoryTypes.FETCH_DEFAULT_CATEGORIES_SUCCESS:
            return {
                ...state, 
                fetchDefaultCategoriesPending: false, 
                defaultCategories: action.payload,
                fetchDefaultCategoriesError: null
            }
        case categoryTypes.FETCH_DEFAULT_CATEGORIES_ERROR:            
            return {...state, fetchDefaultCategoriesPending: false, fetchDefaultCategoriesError: action.payload}

        default: return state
    }
}

export default categoryRedcuer