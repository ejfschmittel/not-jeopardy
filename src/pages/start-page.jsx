import React, {useContext} from 'react'
import {QuizContext, GAME_PHASES} from '../contexts/quizContext'


const StartPage = () => {
    const {setGamePhase} = useContext(QuizContext)

    // move to next game phase (Chose Categories)
    const moveToChoseCategoryPhase = (e) => setGamePhase(GAME_PHASES.CHOSE_CATEGORIES)

    return (
        <div className="layout-container">
            <h1 className="headline--huge">Arne's Quiz Game</h1>
            <button className="button" onClick={moveToChoseCategoryPhase}>Create Game</button>   
        </div>
    )
}

export default StartPage