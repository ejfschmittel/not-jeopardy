import categoryTypes from "./category.types"
import {faGetOrCreateCategory, faGetDefaultCategories} from "../../firebase/firebase.actions"

const addCategoryStart = () => ({
    type: categoryTypes.ADD_CATEGORY_PENDING
})

const addCategorySuccess = (categoryName) => ({
    type: categoryTypes.ADD_CATEGORY_SUCCESS,
    payload: categoryName
})

const addCategoryError = (error) => ({
    type: categoryTypes.ADD_CATEGORY_ERROR,
    payload: error
})

export const addCategory = (categoryName) =>  async (dispatch) => {
    dispatch(addCategoryStart())
    console.log("addCategory")

    if(categoryName === ""){
        dispatch(addCategoryError("Category must not be an empty string!"))
        return
    } 
    
    if(categoryName.length < 3){
        dispatch(addCategoryError("Category must be 3 or more letters"))
        return
    }
    
    if(!categoryName.match(/^[A-Za-z0-9]+$/i)){
        dispatch(addCategoryError("Category can only contain letters and numbers"))
        return;
    }
    console.log("add Category: insert db")
    faGetOrCreateCategory(categoryName)
        .then(res => dispatch(addCategorySuccess(categoryName)))
        .catch(error => console.log(error))
    
}

const fetchDefaultCategoriesStart = () => ({
    type: categoryTypes.FETCH_DEFAULT_CATEGORIES_PENDING
})

const fetchDefaultCategoriesSuccess = (categories) => ({
    type: categoryTypes.FETCH_DEFAULT_CATEGORIES_SUCCESS,
    payload: categories
})

const fetchDefaultCategoriesError = (error) => ({
    type: categoryTypes.FETCH_DEFAULT_CATEGORIES_ERROR,
    payload: error
})

export const fetchDefaultCategories = () => async (dispatch) => {
    dispatch(fetchDefaultCategoriesStart())

    faGetDefaultCategories()
        .then(categories => dispatch(fetchDefaultCategoriesSuccess(categories)))
        .catch(error => dispatch(fetchDefaultCategoriesError(error)))
}