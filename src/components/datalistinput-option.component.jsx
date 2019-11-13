import React from 'react'


const DataListOption = ({data, displayValue, onClick}) => {

    const handleOnClick = (e) => {
        e.stopPropagation()   
        onClick(e, data)
    }

    return (
        <div className="input-datalist__option" onMouseDown={handleOnClick}>
            {displayValue}
        </div>
    )
}

export default DataListOption