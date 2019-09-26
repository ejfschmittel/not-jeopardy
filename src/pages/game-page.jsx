import React, {useContext} from 'react'
import {QuizContext} from "../contexts/quizContext"
import GameGrid from "../components/game-grid/game-grid.component"

const GamePage = () =>  {
    const {gameQuestions} = useContext(QuizContext)

    return (
        <div className="layout-container">
            <GameGrid gameQuestions={gameQuestions}/>
        </div>  
    )
}

export default GamePage