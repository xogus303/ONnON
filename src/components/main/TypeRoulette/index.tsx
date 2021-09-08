import React, {useState} from 'react';
import WheelPicker from 'react-wheelpicker'

export default function TypeRoulette(){

    const [typeData, setTypeData] = useState([
        '인기', '장르', '최신'
    ])
    const [defSelection, setDefSelection] = useState(1)
    const [selection, setSelection] = useState('')

    return (
        <div>
            <WheelPicker
                animation="flat"
                data={typeData}
                height={40}
                parentHeight={200}
                fontSize={20}
                defaultSelection={defSelection}
                updateSelection={(selectedIndex:number) => {
                    setSelection(typeData[selectedIndex])
                    setDefSelection(selectedIndex)
                }}
                scrollerId="scroll-select-subject"
            />
        </div>
    )
}