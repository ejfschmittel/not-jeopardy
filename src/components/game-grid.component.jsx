import React, {createContext} from 'react'
import GameGridColumn from "./game-grid-column.component"
import EditQuestionOverlay from "./game-grid-edit-question-overlay.component"
export const GameGridContext = createContext()

const GameGrid = ({categories}) => {

    const providerValue = {
        overlay: EditQuestionOverlay
    }

    return (
        <GameGridContext.Provider value={providerValue}>
            <div className="game-grid">
                {categories.map(category => 
                    <GameGridColumn category={category} key={`cat-col-${category}`}/>
                )}         
            </div>
        </GameGridContext.Provider>
    )
}

export default GameGrid