import React,{useState} from 'react'
import './Leftmenu.css';
import { useNavigate, useParams } from "react-router-dom";
import { auth } from '../Firebase/Firebase';


function Leftmenu() {
    const [activatedtab, setactivatedtab] = useState("users");
    const navigate = useNavigate();
    const logoutuser = () => {
        auth.signOut().then(() => {
            navigate("/volatilitydashboardbackend");
        }).catch(err => {

        })
    }
    return (
        <div className='leftmenu'>
            <div className="leftmenuinner">
                <h4 onClick={() => {setactivatedtab('users');navigate('/users')}} className={activatedtab === "users" ? 'special' : ''}>Users</h4>
                <h4 onClick={() => {setactivatedtab('monthlyreviews');navigate('/monthlyreviews')}} className={activatedtab === "monthlyreviews" ? 'special' : ''}>Monthly Reviews</h4>
                <h4 onClick={() => {setactivatedtab('mutualfundspick');navigate('/mutualfundspick')}} className={activatedtab === "mutualfundspick" ? 'special' : ''}>Mutual Funds Pick</h4>
                <h4 onClick={() => {setactivatedtab('fundamentaldata');navigate('/fundamentaldata')}} className={activatedtab === "fundamentaldata" ? 'special' : ''}>Fundamental Analysis Data</h4>
                <h4 onClick={() => {setactivatedtab('vgdashboard');window.location.href="https://volatilitygame.com/volatilitydashboard/";}} className={activatedtab === "vgdashboard" ? 'special' : ''}>VG Dashboard</h4>


                {/* <h4 onClick={() => {setactivatedtab('uploadusers');navigate('/uploadusers')}} className={activatedtab === "uploadusers" ? 'special' : ''}>Upload Users</h4> */}
                <h4 onClick={logoutuser} className='special'>Logout</h4>

            </div>
        </div>
    )
}

export default Leftmenu



