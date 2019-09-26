
import React from 'react'

const AskAutofillOverlay = ({show, setShow, onAutofill, title}) => {
    if(!show) return null

    const onAutofillClick = (e) => onAutofill(e)

    const onHideClick = (e) => {
        e.stopPropagation();
        setShow(false);
    }

    return (
        <div className="overlay">
            <div className="overlay__box">                    
                <h4 className="headline--medium">{title}</h4>
                <div className="row">
                    <button className="button button--inline" onClick={onAutofillClick}>Autofill</button>
                    <button className="button button--inline" onClick={onHideClick}>Fix myself</button>
                </div>
            </div>
        </div>   
    )
}

export default AskAutofillOverlay

