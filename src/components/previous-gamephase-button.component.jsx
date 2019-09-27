import React, {useContext} from 'react'
import {QuizContext, GAME_PHASES} from "../contexts/quizContext"
import {ReactComponent as BackButton} from "../assets/arrow-bold-left.svg"


const PreviousGamePhaseButton = () =>{
    const {gamePhase, setGamePhase} = useContext(QuizContext)
    if(gamePhase == GAME_PHASES.START) return null

    const goToPreviousGamePhase = () => {
        switch(gamePhase){
            case GAME_PHASES.CHOSE_CATEGORIES: 
                setGamePhase(GAME_PHASES.START); 
            break;
            case GAME_PHASES.SELECT_QUESTIONS: 
                setGamePhase(GAME_PHASES.CHOSE_CATEGORIES); 
            break;
            case GAME_PHASES.GAME: 
                setGamePhase(GAME_PHASES.SELECT_QUESTIONS); 
            break;
        }

        
    }

    return (
        <div className="nav-button nav-button--left" onClick={goToPreviousGamePhase}>
         <BackButton className="nav-button__svg"/>
        </div>
    )
}

export default PreviousGamePhaseButton