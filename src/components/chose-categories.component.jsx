import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {fetchDefaultCategories} from "../redux/category/cateogry.actions"
import {getNUniqueRandomFromArray} from "../utils/arrays"
import {firestore, updateDocument, addCollectionAndDocument, createQuiz, createCollectionAndDocument} from "../firebase/firebase.utils"

import CategoryInput from "./category-input.component"

const CATEGORY_COUNT = 6;

const getInitalCategoryInputs = (categories = null) => {
    let obj = {}
    for(let i=0; i < CATEGORY_COUNT; i++){
        obj[`cat${i}`] = categories && categories[i] ? categories[i] : null
    }
    return obj
}



const ChoseCategories = ({defaultCategories, fetchDefaultCategories, currentUser}) => {
    const [categoryInputs, setCategoryInputs] = useState(getInitalCategoryInputs())

    const onCatChange = (catKey, catValue) => setCategoryInputs({...categoryInputs, [catKey]: catValue})  

    useEffect(() => {    
        updateDocument("categories", {id: "TB97lxxNmCULhAberCpu", default: false});  
       /* if(!defaultCategories || defaultCategories.length == 0){
            fetchDefaultCategories()
        }    */      
    }, [])

    const areCategorysFilled = () => Object.keys(categoryInputs).reduce((res, catKey) => res ? categoryInputs[catKey] != null : false , true)

    const onSetCategories = (e) =>  {
        e.preventDefault() 
        let categoryInputObjects = categoryInputs
        if(!areCategorysFilled()){
            //replace with asking
            categoryInputObjects = autoFillCategories()
        }

        categoryInputObjects = Object.keys(categoryInputObjects).map(catKey => categoryInputObjects[catKey])
        const quiz = createQuiz(currentUser.id, categoryInputObjects)
        
        // loop through categories = > inster if not already 
        // get back uuid
        // create quiz and add categories [uuuid ]
        
        
        
    }


    const autoFillCategories = () => {
        const randomDefaultCategories = getNUniqueRandomFromArray(defaultCategories, 6);
        const filledInputs = Object.keys(categoryInputs).reduce(
            (res, catKey, idx) => categoryInputs[catKey] ? {...res, [catKey]: categoryInputs[catKey]} : {...res, [catKey]: randomDefaultCategories[idx]}
        , {})
        setCategoryInputs(filledInputs)
        return filledInputs
    }
    
    return (
        <div className="container">
        <div className="container__center-box">
            <form className="form">
                <h1 className="form__title">Choose Quiz Categories</h1>
                <div>
                {Object.keys(categoryInputs).map((catKey) => 
                    <CategoryInput 
                        key={catKey} 
                        name={catKey} 
                        category={categoryInputs[catKey]} 
                        onChange={onCatChange} 
                    />
                )}
                </div>
                <div className="row">
                    <button className="button" onClick={onSetCategories}>Set Categories</button>
                </div>
            </form>
        </div>
        </div>
    )
}

const mapStateToProps = ({userReducer: {currentUser}, categoryReducer: {defaultCategories}}) => ({
    defaultCategories,
    currentUser
})

const mapDispatchToProps = (dispatch) => ({
    fetchDefaultCategories: () => dispatch(fetchDefaultCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChoseCategories)