import React from 'react'

const CategoryInput = ({categories, id, onChange, value}) => (
    <div> 
        <input className="input" list={`choose-category-${id}`} onChange={(e) => onChange(e, id)} value={value}/>
        <datalist id={`choose-category-${id}`}>
            {categories.map(category => <option key={`choose-category-${id}-${category}`} value={category} />)}
        </datalist>
    </div>
)

export default CategoryInput