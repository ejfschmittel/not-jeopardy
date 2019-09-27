import React, {useContext, useState} from 'react'
import {QuizContext, GAME_PHASES} from "../contexts/quizContext"
import GameGrid from "../components/game-grid/game-grid.component"
import AskAutofillOverlay from "../components/ask-autofill-overlay.component"
import Header from "../components/header.component"

const SelectQuestionsPage = () =>  {
    const {gameQuestions,  autoFillAllQuestions, emptyQuestionsExist, setGamePhase} = useContext(QuizContext)
    const [askAutofillQuestions, setAskAutofillQuestions] = useState(false)

    const onConfirmQuesitonsClick = () => {
        if(emptyQuestionsExist()){
            setAskAutofillQuestions(true)
            return
        }

        setGamePhase(GAME_PHASES.GAME)
    }

    const onAutoFillAllQuestions = () => {
        autoFillAllQuestions();
        setAskAutofillQuestions(false)
    }

    return (
        <div className="layout-container">
            <Header>Select Questions</Header>
            <GameGrid edit={true} gameQuestions={gameQuestions}/>
            <button onClick={onConfirmQuesitonsClick} className="button">Confirm Questions</button>
            <AskAutofillOverlay 
                title="You havent set all Questions" 
                show={askAutofillQuestions} 
                setShow={setAskAutofillQuestions} 
                onAutofill={onAutoFillAllQuestions}
            />
     
        </div>
    )
}

export default SelectQuestionsPage
