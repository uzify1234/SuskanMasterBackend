import React from 'react'
import './Loader.css';
import { Audio } from  'react-loader-spinner'


function Loader() {
    return (
        <div className="loader" style={{position : 'fixed',top : 0,left : 0,right : 0, bottom : 0,display : 'flex',justifyContent : 'center',alignItems : 'center',backgroundColor : 'white',zIndex : 1040,flexDirection : 'column'}}>
            <Audio
                height="100"
                width="100"
                color='#121e1e'
                ariaLabel='loading'
            />
        </div>
    )
}

export default Loader
