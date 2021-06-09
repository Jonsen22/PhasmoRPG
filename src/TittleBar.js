import React from 'react'
import "./TittleBar.css"
import logo from './phasmophobia.png'

const ipcRenderer  = window.require('electron').ipcRenderer;

export default function TitleBar() {

    const closeHandler = () => {
        ipcRenderer.invoke('close-event' )
    }

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    return (
        <div className="titleBar">
                    <header className="headerTest" >
                        <div className="titlebar-icon">
                        <img style={{
                            justifyContent: "center",
                            width:"22px",
                        }} src={logo}/>    
                        </div>
                        <div className="titlebar-icon-title">
                            <span>
                                PhasmoRPG
                            </span>
                        </div>
                        <div className="option"
                        onClick={minimizeHandler}
                        >-</div>
                        <div className="option"
                        onClick={closeHandler}
                        >x</div>
                    </header>
                 </div>
    )
}