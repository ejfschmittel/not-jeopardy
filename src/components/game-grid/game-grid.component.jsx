import React from 'react'
import GameGridColumn from "./game-grid-column.component"

const GameGrid = ({gameQuestions}) => {
    return (
        <div className="game-grid">         
            {
                Object.keys(gameQuestions).map((categoryName, idx) => {
                    return <GameGridColumn key={`cat-col-${categoryName}`} categoryName={categoryName} colNum={idx} questions={gameQuestions[categoryName]} />
                })
            }
        </div>
    )
}

export default GameGrid