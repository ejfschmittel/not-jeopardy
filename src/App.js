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
            <main className="main-container">                            
                {getCurrentGamePhasePage()}
            </main>
        </QuizContext.Provider>
    )
}

export default App

/**
    <div>
        Header
            option  healine option
            space conetnt sapce 
            space   button space

            option  healine option
            space conetnt sapce 
            space   button space
        <div>

        </div>
    </div>
 * <lAYOUT header={true} headline={} /> <content></Layout/> 
 
 */

