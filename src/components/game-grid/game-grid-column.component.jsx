import React from 'react'
import GameGridField from "./game-grid-field.component"

const GameGridColumn = ({categoryName, colNum, questions}) => {
    return (
        <React.Fragment>
            <h4 className="game-grid__cell game-grid__cell--header">{categoryName}</h4>
            {
                Object.keys(questions).map((key, idx) => {
                    return <GameGridField key={`${categoryName}-field-${key}`} category={categoryName} value={key} questionObj={questions[key]}/>
                })
            }
        </React.Fragment>
    )
}

export default GameGridColumn