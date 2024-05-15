'use client'

import React, {useState, useEffect} from 'react'

const ColorPicker = ({defaultValue, onSelectColor}) => {
    const colors = ['#ff5733', '#ffc300', '#4caf50', '#2196f3', '#9c27b0', '#ff5722','#795548', '#607db8', '#000000']
    const [selectedColor, setSelectedColor] = useState(defaultValue)
    
    useEffect(() => {
        setSelectedColor(defaultValue)
    }, [defaultValue])

    const handleColorClick = (color) => {
        setSelectedColor(color)
        onSelectColor(color)
    }
  return (
    <div className='flex justify-between mt-2'>
        {
            colors.map((color, index) => (
                <div
                key={index}
                className='h-8 w-8 rounded-full cursor-pointer'
                style={{backgroundColor: color, border: selectedColor === color ? '2px solid #000' : "none"}}
               onClick={() => handleColorClick(color)}
               >

                </div>
            ))
        }
    </div>
  )
}

export default ColorPicker