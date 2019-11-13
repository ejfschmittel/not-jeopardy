import React, {useContext, useState, useEffect} from 'react'
import {GameGridContext} from "./game-grid.component"

import {connect} from "react-redux"

const GameGridCell = ({category, value, editQuiz}) => {
    const [isShowOverlay, setIsShowOverlay] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [question, setQuestion] = useState(null)
    const {overlay: GameGridCellOverlay} = useContext(GameGridContext)

    const hideOverlay = (e) => {
        e.stopPropagation()
        setIsShowOverlay(false)
    }
    const showOverlay = () => setIsShowOverlay(true)

    useEffect(() => {
        if(editQuiz.questions){
            if(editQuiz.questions[category]){
                if(editQuiz.questions[category][value]){
                    setIsFilled(true)
                    setQuestion(editQuiz.questions[category][value])
                    return;
                }
            }
        }
        setIsFilled(false)
        
    },[editQuiz])
    
    return (
        <div className={`game-grid__cell` + (isFilled ? ' game-grid__cell--filled' : '')} onClick={showOverlay}>
            {category}
            | 
            {value}
            {isShowOverlay && <GameGridCellOverlay question={question} category={category} value={value} hideOverlay={hideOverlay}/>}           
        </div>
    )
}

const mapStateToProps = ({quizReducer: {editQuiz}}) => ({
    editQuiz
})

export default connect(mapStateToProps)(GameGridCell)