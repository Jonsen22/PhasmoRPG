import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select'
import './TraitsItems.css'
import { Traits, Items } from './Options'
import { useEffect } from 'react';

const ipcRenderer = window.require('electron').ipcRenderer;
const fs = window.require('fs')

export default function TraitsItems(props) {
    const [traitsList, setTraitsList] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [tempTrait, setTempTrait] = useState([]);
    const [tempItem, setTempItem] = useState([]);
    const [deleteTrait, setDeleteTrait] = useState();
    const [deleteItem, setDeleteItem] = useState();
    const [loadInfo, setLoadInfo] = useState({});

    const useStyles = makeStyles((theme) => ({
        customWidth: {
            maxWidth: 200,
        }
    }))

    function handleMoney(money) {
        props.onChange(money)
    }

    const classes = useStyles();

    const selectStyle = {
        control: (base, state) => ({
            ...base,

            background: "#424242",
            marginLeft: "2px",
            marginRight: "2px",
            color: "#FFFAF0"
            // width: "200px",


        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        }),

        singleValue: base => ({
            ...base,
            color: "#FFFAF0"
        }),

        option: provided => ({
            ...provided,
            color: "#FFFAF0",
            background: "#424242",
            "&:hover": {
                borderColor: "red",
                color: "red"
            }
        }),
        input: base => ({
            ...base,
            color: "#FFFAF0"
        }),

        placeholder: base => ({
            ...base,
            color: "#FFFAF0"
        })
    }

    function deleteListItem() {
        let tempList = [...itemsList];
        for (let i = 0; i < itemsList.length; i++) {
            if (tempList[i].value === deleteItem) {
                tempList[i] = null;
            }
        }

        var filtered = tempList.filter(Boolean)
        console.log(filtered)
        props.setSaveItems(...[filtered])
        return setItemsList(...[filtered])


    }
    function deleteListTrait() {
        let tempList = [...traitsList];
        for (let i = 0; i < traitsList.length; i++) {
            if (tempList[i].value === deleteTrait) {
                tempList[i] = null;
            }
        }
        var filtered = tempList.filter(Boolean)
        props.setSaveTraits(...[filtered])
        return setTraitsList(...[filtered])
    }

    async function dead() { //exemplo de comunicação assincrona entre electron e react
        let emptyList = [];
        const res = await ipcRenderer.invoke('dead-event',)
        if (res === 0) {
            setTraitsList(...[emptyList])
            setItemsList(...[emptyList])
            handleMoney(0)
        } else {
            return
        }
    }

     function getLoadTrait() {
        setTraitsList([...props.loadTraits])

    }
     function getLoadItem() {
        setItemsList([...props.loadItems])
    }

    useEffect( () => {
        getLoadTrait()
        getLoadItem()
    }, [props.loadTraits, props.loadItems])

    const handleDeleteItem = (e) => {
        
        setDeleteItem(e.target.value)
    }

    const handleDeleteTrait = (e) => {
        setDeleteTrait(e.target.value)
    }

    const handleTraitAddTemp = (e) => {
        setTempTrait(e);
    }
    const handleItemAddTemp = (e) => {
        setTempItem(e);
    }


    function handleAddTrait(Trait) {
        const tempTraits = [...traitsList];
        if (tempTraits && tempTraits.includes(Trait))
            return;

        tempTraits.push(Trait)

        props.setSaveTraits([...tempTraits])
        return setTraitsList(...[tempTraits])
    }

    function handleAddItem(Item) {
        const tempItems = [...itemsList];
        if (tempItems && tempItems.includes(Item))
            return;

        tempItems.push(Item)
        props.setSaveItems(...[tempItems])
        return setItemsList(...[tempItems])

    }

    const sortAsc = (a, b) => a.value - b.value;


    function randomNumber(min, max) {
        return (parseInt(Math.random() * (max + 1 - min)) + min) - 1
    }

    function handleTraits() {
        const tempTraits = [...traitsList];
        console.log(tempTraits)
        let rng = randomNumber(1, 38)
        if (tempTraits.length === 37) {
            const result = Traits.filter(({value : id1}) => !tempTraits.some(({value: id2}) => id2 === id1))
            tempTraits.push(result[0])
            tempTraits.sort(sortAsc)
            props.setSaveTraits([...tempTraits])
            return setTraitsList([...tempTraits])



        } else if (tempTraits.length >= 38) {
            return;

        } else {
           
            while ((tempTraits.length !== 0) && (tempTraits.some(e => e.value === Traits[rng].value))) {
                rng = randomNumber(1, 38)
            }
            tempTraits.push(Traits[rng])


            props.setSaveTraits([...tempTraits])
            return setTraitsList([...tempTraits])

        }


    }

    function handleItems() {
        const tempItems = [...itemsList];

        let rng = randomNumber(1, 22)

        if (tempItems.length === 21) {
            const result = Items.filter(({value : id1}) => !tempItems.some(({value: id2}) => id2 === id1))
            console.log(result)
            tempItems.push(result[0])
            tempItems.sort(sortAsc)
            props.setSaveItems(...[tempItems])
            return setItemsList([...tempItems])
        } else if (tempItems.length >= 22) {
            return
        } else {

            while ((tempItems.length !== 0) && (tempItems.some(e => e.value === Items[rng].value))) {
                rng = randomNumber(1, 22)

            }
            
            tempItems.push(Items[rng])
            props.setSaveItems(...[tempItems])
            return setItemsList(...[tempItems])
        }



    }


    return (
        <div className="traitsAndItems"
            style={{
                // overflow: "auto",
                // borderRadius: "10px",
                margin: "auto",
                // marginRight: "-10px",
                justifyContent: "center",
                width: "592px",
                height: "550px",

                textAlign: "center"
            }}>
            <div style={{
                width: "49.2%",
                height: "100%",
                float: 'left',
                borderTop: "3px solid",
                borderRight: "3px solid"
            }} className="Traits">
                <span style={{ fontWeight: 'bold' }}>Traits</span>
                <br /><button onClick={() => { deleteListTrait() }}>Delete</button>

                <select className="Traits-List"
                    style={{
                        marginTop: "2px",
                        width: "290px",
                        height: "400px",
                        background: "#424242",
                        color: "#FFFAF0"
                    }}
                    multiple
                    onChange={handleDeleteTrait}

                >
                    {
                        traitsList && (
                            traitsList.map((trait) => (
                                <Tooltip title={trait.description} classes={{ tooltip: classes.customWidth }}>
                                    <option key={trait.label} value={trait.value}>{trait.label}</option>
                                </Tooltip>
                            )))}
                </select>

                <button onClick={() => { handleTraits() }}>Random</button><br />
                <Select
                    placeholder={"traits"}
                    options={Traits}
                    menuPlacement="top"
                    styles={selectStyle}
                    onChange={handleTraitAddTemp} //?
                ></Select>
                <button onClick={() => { handleAddTrait(tempTrait) }}>Add</button>
                {/* teste save  */}
                {/* <button onClick={handleSave}>Save</button> */}
                {/* teste save  */}
            </div>
            <div style={{
                width: "50%",
                height: "100%",
                // float: 'right'
                borderTop: "3px solid",
                overflow: "hidden"

            }} className="Items">
                <span style={{ fontWeight: 'bold' }}>Items</span>

                <div className="buttons"
                    style={{
                        height: "23px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                >
                    <div className="bttn-delete"
                        style={{
                            display: "flex",
                            // width:"200px",
                            justifyContent: "center"

                        }}>
                        <br /><button onClick={() => { deleteListItem() }}>Delete</button>

                    </div>
                    <div className="bttn-dead"
                        style={{
                            position: "absolute",
                            justifyContent: "center"
                        }}
                    >

                        <button className="DeathButton"
                            style={{
                                position: "absolute",
                                justifyContent: "center",
                                left: "90px",
                                bottom: "-10px"
                                // alignItems: "end"
                                // marginLeft: "20px"
                            }}
                            // onClick={() =>{dead()}}
                            onClick={dead}
                        >Dead</button>
                    </div>

                </div>
                <select
                    className="Items-List"
                    style={{
                        marginTop: "2px",
                        width: "296px",
                        height: "400px",
                        background: "#424242",
                        color: "#FFFAF0"
                    }}
                    multiple
                    onChange={handleDeleteItem}
                >
                    {itemsList && (
                        itemsList.map((item) => (
                            <option key={item.label} value={item.value}>{item.label}</option>
                        )))}
                </select>
                <button onClick={() => { handleItems() }}>Random</button> <br />
                <Select placeholder={"items"}
                    menuPlacement="top"
                    styles={selectStyle}
                    options={Items}
                    // value={Items}
                    onChange={handleItemAddTemp}
                ></Select>
                <button onClick={() => { handleAddItem(tempItem) }}>Add</button>
            </div>
        </div>
    )
}
