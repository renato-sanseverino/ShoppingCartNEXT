
import { useState } from 'react';


export default function NumberSpinner() {
    const [currentCount, setCurrentCount] = useState(1);

    function increase(){
        if (currentCount >= 99) {
            setCurrentCount(99);
            return;
        }
        setCurrentCount(currentCount => currentCount+1);
    }

    function decrease(){
        if (currentCount <= 0) {
            setCurrentCount(0);
            return;
        }
        setCurrentCount(currentCount => currentCount-1);
    }

	return <>
                <style jsx>{`
                    .input-spinner {
                        position: relative;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: stretch;
                        width: 100%;
                    }

                    .svgicon{
                        background-color: transparent;
                        border: 0px;
                        width: 25px;
                        height: 25px;
                    }

                    .count{
                        width: 40px;
                        height: 25px;
                        line-height: 25px;
                        text-align: center;
                    }
                `}</style>

                <div className='input-spinner'>
                    <div id="decrease">
                        <button className='svgicon' style={{'backgroundImage': 'url("icons/circle_minus.svg")'}} onClick={decrease} />
                    </div>
                    <div className='count'>
                        <span style={{'fontSize': '20px'}}>{ currentCount }</span>
                    </div>
                    <div id="increase">
                        <button className='svgicon' style={{'backgroundImage': 'url("icons/circle_plus.svg")'}} onClick={increase} />
                    </div>
                </div>
		    </>;
}
