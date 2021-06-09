import React, { useEffect, useState } from 'react';
import TraitsItems from './TraitsItems.jsx'
import TittleBar from './TittleBar'

export default function Program() {
    const [money, setMoney] = useState(0);
    const [tempMoney, setTempMoney] = useState('');

    return (
        <div className="all" style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#121212",
            borderRadius: "10px 10px 10px 10px",
            width: "598px",
            border: "1px solid "
            // height: "639px"
        }}>
           
                <TittleBar/>

                <div className="MoneyDiv" style={{

                    height: "100%",
                    display: 'flex',
                    marginTop: "16px",
                    flexDirection: 'column',
                }}>
                    <div className="MoneyDisplay"
                        style={{
                            textAlign: "center",

                        }} >

                        <span style={{
                            color: "green",
                            // margin: "0px",
                            fontSize: "18px"
                        }}>{money + "$"}</span>

                    </div>
                    <div className="MoneyButtons"
                        style={{
                            // position: 'absolute',
                            alignSelf: "center",
                            left: "38%",
                            top: "80%",
                            // height: '30px'
                        }}>
                        <input
                            style={{
                                width: "30px"
                            }}
                            type="text"
                            pattern="[0-9]*"
                            value={tempMoney}
                            onChange={(e) => { setTempMoney(+e.target.value) }}
                        />
                        <button onClick={() => setMoney(money + tempMoney)}>+</button>
                        <button onClick={() => setMoney(money - tempMoney)}>-</button>
                        <button onClick={() => setMoney(0) && setTempMoney('')}>Reset</button>
                    </div>
                </div>
            
            <div className="TraitsTab">
                <TraitsItems />
            </div>
            <div className="MapsTab"></div>
        </div>
    )
}