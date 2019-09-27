import React from 'react'
import PreviousGAmePhaseButton from "./previous-gamephase-button.component"
import OptionsButton from "./options-button.component"

const Header = ({children}) => {

    return (
        <header className="header">
            <PreviousGAmePhaseButton />
            <h1 className="header__title">{children}</h1>
            <OptionsButton />
        </header>
    )
}

export default Header

