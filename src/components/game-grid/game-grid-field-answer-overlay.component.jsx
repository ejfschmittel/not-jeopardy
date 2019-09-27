import React, {useContext} from 'react'
import {QuizContext} from "../../contexts/quizContext"


const GameGridFieldAnswerOverlay = ({questionObj, category, value, hideOverlay}) => {
    const {setGameQuestion} = useContext(QuizContext)
    const {answer, question, used} = questionObj

    const onUse = (e) => {
        setGameQuestion(category, value, {
            ...questionObj,
            used: true
        })
        hideOverlay(e)
    }

    return (
        <div className="overlay">
            <div className="overlay__box">
                <div className="question-display">
                    {question}{question.substring(question.length-1) != "?" ? "?" : ""}
                </div>
                <div className="answer-display">
                {answer}
                </div>
                <div className="button-row">   
                    {!used ? <button className="button button--inline" onClick={onUse}>use</button> : null}
                    <button className="button button--inline" onClick={hideOverlay}>cancel</button>
                </div>
            </div>
        </div>
    )
}

export default GameGridFieldAnswerOverlay