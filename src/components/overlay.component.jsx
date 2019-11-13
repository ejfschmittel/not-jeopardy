import React from 'react'


const Overlay = ({children}) => {
    
    return (
        <div className="overlay">
            <div>
                {children}
            </div>
        </div>
    )
}

export default Overlay