import React from 'react'


const ValueInput = ({onChange, value, className, name}) => {
    return (
        <select name={name || "value"} className={className || 'input'} value={value} onChange={onChange}>
            <option value="200">200</option>
            <option value="400">400</option>
            <option value="600">600</option>
            <option value="800">800</option>
            <option value="1000">1000</option>
        </select>
    )
}

export default ValueInput