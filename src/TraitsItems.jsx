import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select'
import './TraitsItems.css'
import { Traits , Items } from './Options'

export default function TraitsItems() {
    const [traitsList, setTraitsList] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [tempTrait, setTempTrait] = useState([]);
    const [tempItem, setTempItem] = useState([]);
    const [deleteTrait, setDeleteTrait] = useState();
    const [deleteItem, setDeleteItem] = useState();

    const useStyles = makeStyles((theme) => ({
        customWidth: {
            maxWidth: 200,
        }
    }))

    const classes = useStyles();

    const selectStyle = {
        control: (base, state) => ({
            ...base,

            background: "#424242",
            marginLeft: "2px",
            marginRight: "2px",
            color: "white"
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

        option: provided => ({
            ...provided,
            color: "white",
            background: "#424242",
            "&:hover": {
                borderColor: "red",
                color: "red"
            }
        })
    }

    function deleteListItem() {
        let tempList = [...itemsList];
        console.log(tempList)
        for (let i = 0; i < itemsList.length; i++) {
            if (tempList[i].value === deleteItem) {
                console.log(tempList[i])
                tempList[i] = null;
            }
        }

        var filtered = tempList.filter(Boolean)
        console.log(filtered)
        return setItemsList(...[filtered])

    }
    function deleteListTrait() {
        let tempList = [...traitsList];
        console.log(tempList)
        for (let i = 0; i < traitsList.length; i++) {
            if (tempList[i].value === deleteTrait) {
                console.log(tempList[i])
                tempList[i] = null;
            }
        }

        var filtered = tempList.filter(Boolean)
        console.log(filtered)
        return setTraitsList(...[filtered])

    }

    function dead() {
        let emptyList = [];
        if (window.confirm("Are you sure?")) {
            setTraitsList(...[emptyList])
            setItemsList(...[emptyList])
        } else {
            return
        }
    }

    const handleDeleteItem = (e) => {
        // console.log(e.target.value)
        setDeleteItem(e.target.value)
    }

    const handleDeleteTrait = (e) => {
        console.log(e.target.value)
        setDeleteTrait(e.target.value)
    }

    const handleTraitAddTemp = (e) => {
        console.log(e)

        setTempTrait(e);
    }
    const handleItemAddTemp = (e) => {
        console.log(e)
        setTempItem(e);
    }

    function handleAddTrait(Trait) {
        const tempTraits = [...traitsList];
        console.log(traitsList)
        if (tempTraits && tempTraits.includes(Trait))
            return;

        tempTraits.push(Trait)
        console.log(tempTraits)
        return setTraitsList(...[tempTraits])
    }

    function handleAddItem(Item) {
        const tempItems = [...itemsList];
        console.log(itemsList)
        console.log(tempItems)
        if (tempItems && tempItems.includes(Item))
            return;

        tempItems.push(Item)
        console.log(tempItems)
        return setItemsList(...[tempItems])

    }

    const sortAsc = (a, b) => a.value - b.value;


    function randomNumber(min, max) {
        return (parseInt(Math.random() * (max + 1 - min)) + min) - 1
    }

    function handleTraits() {
        const tempTraits = [...traitsList];

        let rng = randomNumber(1, 38)
        console.log(rng)

        if (tempTraits.length === 37) {
            // tempTraits.sort(function (a , b) {
            //     return parseInt(a.value) - parseInt(b.value);
            // })
            tempTraits.sort(sortAsc)
            let difference = Traits
                .filter(x => !tempTraits.includes(x))
                .concat(tempTraits.filter(x => !Traits.includes(x)));

            console.log(difference)
            tempTraits.push(difference[0])
            tempTraits.sort(sortAsc)
            return setTraitsList([...tempTraits])

        } else if (tempTraits.length >= 38) {
            return;

        } else {
            while ((tempTraits.length !== 0) && (tempTraits.includes(Traits[rng]))) {
                rng = randomNumber(1, 38)
                console.log(rng)
            }
            tempTraits.push(Traits[rng])
            return setTraitsList([...tempTraits])

        }

    }

    function handleItems() {
        const tempItems = [...itemsList];

        let rng = randomNumber(1, 22)

        if(tempItems.length === 21) {
            tempItems.sort(sortAsc)
            let difference = Items
                .filter(x => !tempItems.includes(x))
                .concat(tempItems.filter(x => !Items.includes(x)));

            tempItems.push(difference[0])
            tempItems.sort(sortAsc)
            console.log(tempItems)
            return setItemsList([...tempItems])
        } else if(tempItems.length >= 22) {
            return
        } else {

            while ((tempItems.length !== 0) && (tempItems.includes(Items[rng]))) {
                rng = randomNumber(1, 22)
        
            }
    
            tempItems.push(Items[rng]) 
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
                        onClick={() => { dead() }}
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
