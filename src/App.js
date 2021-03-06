import React, { useState } from 'react';
import TraitsItems from './TraitsItems.jsx'
import TittleBar from './TittleBar'

export default function Program() {
    const [money, setMoney] = useState(0);
    const [tempMoney, setTempMoney] = useState('');
    const [loadTraits, setLoadTraits] = useState([]);
    const [loadItems, setLoadItems] = useState([]);
    const [saveTraits, setSaveTraits] = useState([]);
    const [saveItems, setSaveItems] = useState([]);
    const [load, setLoad] = useState({});

    // const handleTraitList = (traitTemp) => {
    //     console.log(traitTemp)
    //     setTraitList(traitTemp)
    // }
    // const handleItemList = (itemTemp) => {
    //     console.log(itemTemp)
    //     setItemList(itemTemp)
    // }


    // console.log(traitList)
    // console.log(itemList)
    function handleMoney(newMoney) {
        console.log("Money update: " + money)
        setMoney(newMoney);

    }

    function handleResetMoney() {
        setMoney(0);
        setTempMoney(0);
    }

    function handleSumMoney() {
        setMoney(money + tempMoney);
        setTempMoney(0);
    }

    function handleDifferenceMoney() {
        setMoney(money - tempMoney);
        setTempMoney(0);
    }

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

            <TittleBar 
            setLoadTraits={setLoadTraits}
            setLoadItems={setLoadItems}
            setLoad={setLoad} 
            Traits={saveTraits}
            Items={saveItems}
            setMoney={setMoney}
            money={money} />

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
                    <button onClick={() => handleSumMoney()}>+</button>
                    <button onClick={() => handleDifferenceMoney()}>-</button>
                    <button onClick={() => handleResetMoney()}>Reset</button>
                </div>
            </div>

            <div className="TraitsTab">
                <TraitsItems 
                money={money} 
                onChange={handleMoney} 
                load={load}
                setSaveTraits={setSaveTraits}
                setSaveItems={setSaveItems}
                loadTraits={loadTraits}
                loadItems={loadItems}
                 />
            </div>
            <div className="MapsTab"></div>
        </div>
    )
}