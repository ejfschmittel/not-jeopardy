import React, {useState, useContext} from 'react'
import {QuizContext} from "../contexts/quizContext"
import {ReactComponent as OptiosIcon} from "../assets/cog.svg"

const OptionsButton = () => {
    const {resetQuizState} = useContext(QuizContext)
    const [showOptions, setShowOptions] = useState(false)

    const toggleOptions = () => setShowOptions(!showOptions)

    const onResetGame = (e) => {
        e.stopPropagation()
        resetQuizState();
        location.reload();
    }

    return (
        <div className="options-menu">
            <div className="options-menu__button" onClick={toggleOptions}>
                <OptiosIcon />
            </div>

            {showOptions ? 
                <div className="options-menu__options">
                    <div className="options-menu__options-item" onClick={onResetGame}>
                        reset game
                    </div>                  
                </div>
            : null}
        </div>
    )
}

export default OptionsButton