import React, {useState, useContext} from 'react'
import {QuizContext} from "../../contexts/quizContext"


//field / question / question overlay / where to get edit??
const GameGridFieldEditor = ({questionObj, hideOverlay, category, value}) => {
    const {setGameQuestion, getRandomPremadeQuestion} = useContext(QuizContext);
    const [questionState, setQuestionState] = useState(questionObj.question)
    const [answerState, setAnswerState] = useState(questionObj.answer)

    const onSubmitQuestion = (e) => {
        setGameQuestion(category, value,{
            ...questionObj,
            question: questionState,
            answer: answerState,
            filled: (questionState !== "" && answerState !== ""),
        })
        hideOverlay(e)
    }

    const setRandomQuestion = (e) => {
        const {question, answer} = getRandomPremadeQuestion(category, value)
        setQuestionState(question)
        setAnswerState(answer)
    }

    return (
        <div className="overlay">
            <div className="overlay__box">
                <label className="label">Question</label>
                <input className="input input--small" type="text" onChange={(e) => setQuestionState(e.target.value)} value={questionState}/>
                <label className="label">Answer</label>
                <input className="input input--small" type="text" onChange={(e) => setAnswerState(e.target.value)} value={answerState}/>
                <div className="row">
                    <button className="button button--inline" onClick={onSubmitQuestion}>Set Question</button>
                    <button className="button button--inline" onClick={setRandomQuestion}>autofill</button>
                    <button className="button button--inline" onClick={hideOverlay}>cancel</button>
                </div>               
            </div>
        </div>
    )
}

export default GameGridFieldEditor