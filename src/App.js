import React, {createContext, useState, useEffect, useContext} from 'react'

import StartPage from "./pages/start-page"
import ChoseCategoryPage from "./pages/chose-categories-page"
import SelectQuestionsPage from "./pages/select-questions-page"
import GamePage from "./pages/game-page"

import PrevisousGamePhaseButton from "./components/previous-gamephase-button.component"
import OptionsButton from "./components/options-button.component"

import {useQuizContext,QuizContext, GAME_PHASES} from "./contexts/quizContext"
import 'style/main.scss'


const App = () => {
    const quizContextValues = useQuizContext()
    const {gamePhase} = quizContextValues
    console.log(quizContextValues)

    // use callback ??? / optimize
    const getCurrentGamePhasePage = () => {
        switch(gamePhase){
            case GAME_PHASES.SELECT_QUESTIONS:
                return (<SelectQuestionsPage />)
            case GAME_PHASES.CHOSE_CATEGORIES:
                return (<ChoseCategoryPage />)
            case GAME_PHASES.GAME:
                return (<GamePage />)
            case GAME_PHASES.START:
            default: 
                return (<StartPage />)
        }
    }
     
    return (
        <QuizContext.Provider value={quizContextValues}>
            <main>
                <OptionsButton />
                <PrevisousGamePhaseButton />
                <div className="background"></div>
                {getCurrentGamePhasePage()}
            </main>
        </QuizContext.Provider>
    )
}

export default App