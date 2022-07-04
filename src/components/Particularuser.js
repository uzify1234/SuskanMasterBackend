import React , {useState,useEffect} from 'react'
import './Particularuser.css';
import db, { auth } from '../Firebase/Firebase';
import Loader from '../helpers/Loader';
import { useNavigate, useParams } from "react-router-dom";

function Particularuser() {
    const navigate = useNavigate();
    var {uid} = useParams();

    const [user, setuser] = useState(null);
    const [isloading, setisloading] = useState(true);

    useEffect(() => {
        db.collection('users').doc(uid).get().then(userinfo => {
            setuser(userinfo.data());
            setisloading(false);
        }).catch(err => {
            setisloading(false);
        })
    }, [])
    const updatetapped = () => {
        var expirationtime = Math.floor(Date.now() / 1000);
        if(user.usertype === "FFF Pro Trial") {
            var today = new Date();
            var futureDate = new Date(new Date().setDate(today.getDate() + 30));
            expirationtime = (Math.floor(futureDate / 1000));
        }
        else if(user.expirationtime !== undefined) {
            expirationtime = user.expirationtime;
        }
        db.collection('users').doc(uid).update({
            firstname : user.firstname,
            lastname : user.lastname,
            address : user.address,
            mobile : user.mobile,
            arn : user.arn,
            city : user.city,
            usertype : user.usertype,
            expiretime : expirationtime,
            isactive : user.isactive
        }).then(done => {
            alert("User Updated");
        }).catch(err => {
            
        })
    }
    const resetpasswordtapped = () => {
        setisloading(true);
        user && auth.sendPasswordResetEmail(user.email)
        .then(() => {
          alert("Password reset link has been sent to "+user.email);
          setisloading(false);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert("Error sending password reset link");
          setisloading(false);
          // ..
        });
    }

    const getmetime = (time) => {
        var month = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var datestring =  new Date(time*1000).toLocaleDateString("en-US");
        var stringarray = datestring.split("/");
        var combine = stringarray[1]+"-"+month[stringarray[0]]+"-"+stringarray[2];
        return combine;
    }
    return (
        <div className='particularuser'>
            {isloading && <Loader />}
            {
                user && <div className='userdetails'>
                    <div>
                        {(user.usertype === "FFF Pro Trial" && user.expiretime !== undefined) && <h4>Profile Expires on : {getmetime(user.expiretime)}</h4>}
                    </div>
                    <div>
                        <h5>Firstname</h5>
                        <input type="text" defaultValue={user?.firstname} onChange={e => {user.firstname = e.target.value}} />
                    </div>
                    <div>
                        <h5>Lastname</h5>
                        <input type="text" defaultValue={user?.lastname} onChange={e => {user.lastname = e.target.value}} />
                    </div>
                    <div>
                        <h5>Email</h5>
                        <input type="email" defaultValue={user?.email} disabled />
                    </div>
                    <div>
                        <h5>Mobile</h5>
                        <input type="number" defaultValue={user.mobile} onChange={e => {user.mobile = e.target.value}} />
                    </div>
                    <div>
                        <h5>Address</h5>
                        <input type="text" defaultValue={user.address} onChange={e => {user.address = e.target.value}} />
                    </div>
                    <div>
                        <h5>ARN</h5>
                        <input type="text" defaultValue={user.arn} onChange={e => {user.arn = e.target.value}} />
                    </div>
                    <div>
                        <h5>City</h5>
                        <input type="text" defaultValue={user.city} onChange={e => {user.city = e.target.value}} />
                    </div>
                    <div>
                        <h5>User Type</h5>
                        <select onChange={e => {user.usertype = e.target.value}}>
                            <option selected={user.usertype === "Volatility Coaches"}>VC</option>
                            <option selected={user.usertype === "FFF Pro"}>FFF Pro</option>
                            <option selected={user.usertype === "FFF Pro Trial"}>FFF Pro Trial</option>
                        </select>
                    </div>
                    <div>
                        <h5>Is Active</h5>
                        <select onChange={e => {user.isactive = e.target.value === "Active" ? true : false}}>
                            <option selected={user.isactive === true}>Active</option>
                            <option selected={user.isactive === false}>Inactive</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={updatetapped}>Update</button>
                        <button onClick={resetpasswordtapped}>Reset Password</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Particularuser
