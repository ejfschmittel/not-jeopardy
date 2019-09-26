import React, {useContext, useState} from 'react'
import {QuizContext, GAME_PHASES} from "../contexts/quizContext"

import CategoryInputList from "../components/category-input-list.component"
import AskAutofillOverlay from "../components/ask-autofill-overlay.component"


const generateCategorySlots = (existingCategories) => {
    let obj = {}
    for(let i=0; i < 6; i++){
        obj[`cat${i}`] = existingCategories[i] ? existingCategories[i] : ""
    }
    return obj
}


const ChoseCategoriesPage = () => {
    const {
        premadeCategories, 
        setGamePhase, 
        selectedCategories, 
        autoFillGameCategories,  
        setGameCategories
    } = useContext(QuizContext)
  
    const generatedSlots = generateCategorySlots(selectedCategories)

    const [askAutofill, setAskAutofill] = useState(false)
    const [categorySlots, setCategorySlots] = useState(generatedSlots)

    const onChange = (e, id) => setCategorySlots({...categorySlots, [id]:e.target.value})

    const getCategorySet = () => {
        const categorySet = new Set(Object.keys(categorySlots).map(key =>  categorySlots[key]))
        categorySet.delete("")
        return categorySet
    }

    const onSetGameCategories = () => {
        const categorySet = getCategorySet()

        if(categorySet.size != 6){
            setAskAutofill(true)
            return
        }

        setGameCategories([...categorySet])
        setGamePhase(GAME_PHASES.SELECT_QUESTIONS)
    }

    const autoFillCategories = () =>{
        const categorySet = getCategorySet()
        autoFillGameCategories(categorySet)
        setGamePhase(GAME_PHASES.SELECT_QUESTIONS)
    }


    console.log(premadeCategories)
    return (
        <div className="layout-container">
            <h1 className="headline--huge">Chose 6 Categories</h1>   
            <CategoryInputList categorySlots={categorySlots} onChange={onChange} premadeCategories={premadeCategories}/>                 
            <button className="button" onClick={onSetGameCategories}>Set Categories</button>
            <AskAutofillOverlay 
                title="You didnt Chose 6 unique Categories" 
                show={askAutofill} 
                setShow={setAskAutofill} 
                onAutofill={autoFillCategories}
            />
        </div>
    )
}

export default ChoseCategoriesPage

