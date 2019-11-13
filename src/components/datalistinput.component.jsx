import React, {useState, useEffect} from 'react'
import DataListOption from "./datalistinput-option.component"

const DataListInput = ({data, name, displayKey, onChange, value, className}) => {
    
    const [showDataList, setShowDataList] = useState(false);
    const [dataListValues, setDataListValues] = useState(data)

    const objKey = displayKey || name;

    useEffect(() => {
        setDataListValues(data)
    },[data])

    useEffect(() => {
        if(data && data.length > 0){
            const reducedData = data.reduce((res, item) => item[objKey].toLowerCase().includes(value.toLowerCase()) ? [...res, item] : res , [])
            setDataListValues(reducedData)
        }  
    }, [value])

    const handleInput = (e) => {
        console.log("handle INput")
        const {name, value} = e.target
        onChange(e, {[objKey]: value}, name)
    }

    const onFocus = () => setShowDataList(true)
    const onBlur = () => setShowDataList(false)

    const handleListOption = (e, value) => {
        onChange(e, value, name)
    }

    
    return (
        <div className="input-datalist__wrapper" >
            <input className={className} name={name} onClick={handleInput} value={value} onChange={handleInput} onFocus={onFocus} onBlur={onBlur}  autoComplete="off"/>
            {showDataList && 
                <div className="input-datalist">
                    <div className="input-datalist__options">
                    {dataListValues && dataListValues.length > 0 ?  
                        dataListValues.map((item, idx) => (
                            <DataListOption 
                                key={item.id || `data-item-${name}-${idx}`} 
                                displayValue={item[objKey]}
                                data={item}
                                onClick={handleListOption}
                                />
                        ))
                        :
                        <div>Could not find any Questions for this category</div>
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default DataListInput