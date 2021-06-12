import React from 'react'
import "./TittleBar.css"
import logo from './phasmophobia.png'

const ipcRenderer = window.require('electron').ipcRenderer;
const fs = window.require('fs')

export default function TitleBar(props) {

    // const[saveList, setSaveList] = useState([])

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    async function handleSave() {
        const res = await ipcRenderer.invoke('save-char')
        const traits = { ...props.Traits };
        const items = { ...props.Items };
        const money = props.money;
        const output = { traits, items, money }
        const save = JSON.stringify(output);
        console.log(JSON.stringify(output))
        fs.writeFile(res.filePath, save, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("File saved!")
        });

    }

    async function handleLoad() {
        var obj;
        let tempTraits = ([]);
        let tempItems = ([]);
        const res = await ipcRenderer.invoke('load-char')
        console.log(res.filePaths[0])
        if (res.filePaths[0] !== undefined) {

            fs.readFile(res.filePaths[0], 'utf8', (err, data) => {
                if (err) {
                    return console.log(err)
                }
                obj = JSON.parse(data)
                // console.log(obj.traits[0])

                for (var i in obj.traits) {
                    var a = obj.traits[i]
                    tempTraits.push(a)
                }
                for (var i in obj.items) {
                    var a = obj.items[i]
                    tempItems.push(a)
                }

                console.log(obj.money)

                props.setLoadTraits(...[tempTraits])
                props.setLoadItems(...[tempItems])
                props.setMoney(obj.money)
            })
        } 
    }

    return (
        <div className="titleBar">
            <header className="headerTest" >
                <div className="titlebar-icon">
                    <img style={{
                        justifyContent: "center",
                        width: "22px",
                    }} src={logo} alt={logo} />
                </div>
                <div className='file'
                    onClick={handleSave}>
                    Save
                </div>
                <div className='file'
                    onClick={handleLoad}>
                    Load
                </div>
                <div className="titlebar-icon-title">
                    <span>
                        PhasmoRPG
                    </span>
                </div>
                <div className="option"
                    onClick={minimizeHandler}
                >-</div>
                <div className="option-close"
                    onClick={closeHandler}
                >x</div>
            </header>
        </div>
    )
}