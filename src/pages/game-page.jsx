import React, {useContext} from 'react'
import {QuizContext} from "../contexts/quizContext"
import GameGrid from "../components/game-grid/game-grid.component"
import Header from "../components/header.component"

const GamePage = () =>  {
    const {gameQuestions} = useContext(QuizContext)

    return (
        <div className="layout-container">
            <Header>Game</Header>
            <GameGrid gameQuestions={gameQuestions}/>
            <button className="button">Reset Game</button>
        </div>  
    )
}

export default GamePage