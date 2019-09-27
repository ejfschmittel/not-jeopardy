import React, {useState, useContext} from 'react'
import questions from '../../data/questions'
import {QuizContext, GAME_PHASES} from "../../contexts/quizContext"
import GameGridFieldEditor from "./game-grid-field-editor.component"
import GameGridFieldAnswerOverlay from "./game-grid-field-answer-overlay.component"

//field / question / question overlay / where to get edit??
// qObject = {question, answer, played, filled}

const GameGridField = ({value, questionObj, category}) => {
    const {gamePhase} = useContext(QuizContext)    
    const [showOverlay, setShowOverlay] = useState(false)
    
    const hideOverlay = (e) => {
        e.stopPropagation();
        setShowOverlay(false)
    }

    if(gamePhase == GAME_PHASES.SELECT_QUESTIONS){      
        if(!questionObj.filled){
            //setting default object
            questionObj = {
                question: "",
                answer: "",
                filled: false,
                played: false,
                ...questionObj
            }
        }   
    }

    const onCellClick = () => {
        setShowOverlay(true)
    }

    const renderOverlay = () => {     
        if(showOverlay && gamePhase == GAME_PHASES.SELECT_QUESTIONS){
            return <GameGridFieldEditor hideOverlay={hideOverlay} questionObj={questionObj} category={category} value={value}/>
        }else if(showOverlay && gamePhase == GAME_PHASES.GAME){
            return <GameGridFieldAnswerOverlay hideOverlay={hideOverlay} questionObj={questionObj} category={category} value={value} />
        }
        return null
    }
    
    return (
        <div className={`game-grid__cell ${questionObj.filled? 'game-grid__cell--filled' : ''} ${questionObj.used? 'game-grid__cell--used' : ''}`} onClick={onCellClick}>
            {value} {category}
            {renderOverlay()}         
        </div>
    )
}

export default GameGridField