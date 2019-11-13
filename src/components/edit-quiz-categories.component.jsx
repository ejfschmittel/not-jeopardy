import React, {useState, useEffect, useMemo} from 'react'
import CategoryInput from "./category-input.component"
import {connect} from "react-redux"
import {fetchDefaultCategories} from "../redux/category/cateogry.actions"
import {setQuizCategories} from "../redux/quiz/quiz.actions"
import {getNUniqueRandomFromArray} from "../utils/arrays"


import AutofillOverlay from "./edit-quiz-categories-autofill-overlay.component"

const CATEGORY_COUNT = 6;


const getInitalCategoryInputs = (categories) => {
    return [...Array(CATEGORY_COUNT)].reduce((res, _, idx) => (
        {...res, [`cat${idx}`]: categories && categories[idx] ? {name: categories[idx], default: false, id: null} : {name: ""}}), 
        {}
    )
}


const EditQuizCategories = ({defaultCategories, fetchDefaultCategories, editQuiz, setQuizCategories}) => {
    
    const [categoryInputs, setCategoryInputs] = useState(getInitalCategoryInputs(editQuiz.categories))
    const [showAutofillOverlay, setShowAutofillOverlay] = useState(false)

    const onCatChange = (e, catValue, catKey) => {
        // set Category cat-x to {default: false, id: null, name: "x"}
        setCategoryInputs({...categoryInputs, [catKey]: catValue})
    }

    // onload fetch default categories
    useEffect(() => {    
        if(!defaultCategories || defaultCategories.length == 0){
            fetchDefaultCategories()
        }     
    }, [])
    

    const emptyCategorysExist = () => {
        return Object.keys(categoryInputs).reduce((empty, key) =>  
            categoryInputs[key].name == "" ? true : empty,
            false
        )
    }

    const duplicateCategoriesExist = () => {
        const uniques = new Set(Object.keys(categoryInputs).map(key => categoryInputs[key].name.toLowerCase()))
        return uniques.size != 6
    }
  

    const onSetCategories = (e) =>  {
        e.preventDefault() 

        // check for empty spots or duplicates and ask for autofill
        if(emptyCategorysExist() || duplicateCategoriesExist()){
            // show overlay
            setShowAutofillOverlay(true)
            return;
        }

        const submitObjects = Object.keys(categoryInputObjects).map(catKey => categoryInputObjects[catKey])
        setQuizCategories(editQuiz, submitObjects)
    }

    const autoFillCategories = () => {
        if(defaultCategories && defaultCategories.length >= 6){
            
            let filledCategories = {}
            let usedCategories = []

            // set all empty or duplicate categories to null and push nonempty categoryNames to array
            // check if empty of duplicate
            // if set to null
            // else insert value and memorize categoryName
            Object.keys(categoryInputs).forEach(key => {
                const val = categoryInputs[key]
                if(!val || val.name == "" || usedCategories.includes(val.name.toLowerCase())){
                    filledCategories[key] = null
                }else{
                    usedCategories.push(val.name.toLowerCase())
                    filledCategories[key] = val
                }
            })

            // fill up null spaces from operation before
            // loop through filled
            // if value is empty
            // get uniuqe random category and insert
            Object.keys(filledCategories).forEach(key => {
                const val = filledCategories[key]

                if(!val){
                    let randCat = null

                    do{
                        randCat = getNUniqueRandomFromArray(defaultCategories, 1)[0]   
                    }while(usedCategories.includes(randCat.name))

                    if(randCat) {
                        usedCategories.push(randCat.name)
                        filledCategories[key] = randCat
                    }
                }
            })

            setCategoryInputs(filledCategories)
        }
    }

    return (
        <div className="container">
            <div className="container__center-box">
                <form className="form">
                    <h4 className="form__title">Choose Quiz Categories</h4>
                    <div>
                    {Object.keys(categoryInputs).map((catKey) => 
                        <CategoryInput 
                            key={catKey} 
                            name={catKey} 
                            value={categoryInputs[catKey].name} 
                            onChange={onCatChange} 
                        />
                    )}
                    </div>
                    <div className="row">
                        <button className="button" onClick={onSetCategories}>Set Categories</button>
                    </div>
                </form>
            </div>
            <AutofillOverlay showOverlay={showAutofillOverlay} setShowOverlay={setShowAutofillOverlay} autofill={autoFillCategories} />
            
        </div>
    )
}

const mapStateToProps = ({userReducer: {currentUser}, categoryReducer: {defaultCategories}, quizReducer: {editQuiz}}) => ({
    defaultCategories,
    currentUser,
    editQuiz
})

const mapDispatchToProps = (dispatch) => ({
    fetchDefaultCategories: () => dispatch(fetchDefaultCategories()),
    setQuizCategories: (quizId, categories) => dispatch(setQuizCategories(quizId, categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditQuizCategories)