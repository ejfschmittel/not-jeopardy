import React from 'react'


const AutofillOverlay = ({showOverlay, setShowOverlay, autofill}) => {
    if(!showOverlay) return null

    const hideOverlay = () => setShowOverlay(false)
    const onBoxClick = (e) => e.stopPropagation();

    return (
        <div className="overlay" onClick={hideOverlay}>
            <div className="overlay__box-center" onClick={onBoxClick}>
                <span className="overlay__exit" onClick={hideOverlay}>X</span>
                <h3 className="overlay__heading">Autofill Catgories?</h3>
                <p className="overlay__text">
                    All 6 Category slots must be filled with unique categories! 
                    It appears there are duplicate categories or empty category Slots.
                    Should Theses slots be autofilled?
                </p>
                <div className="row">
                    <button className="button" onClick={autofill}>Autofill</button>
                    <button className="button" onClick={hideOverlay}>Fix myself</button>
                </div>
            </div>
        </div>
    )
}

export default AutofillOverlay