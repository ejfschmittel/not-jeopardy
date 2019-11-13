import React from 'react'
import GameGridCell from "./game-grid-cell.component"

const questionValues = [200, 400, 600, 800, 1000]

const GameGridColumn = ({category}) => {
    return (
        <React.Fragment>
            <div className="game-grid__cell game-grid__column-header">{category}</div>
            {questionValues.map((value) => 
                <GameGridCell key={`grid-cell-${category.id}-${value}`} category={category} value={value}/>   
            )}
        </React.Fragment>
    )
}

export default GameGridColumn