import React,{useState,useEffect} from 'react'
import db, { auth } from '../Firebase/Firebase';
import { useNavigate, useParams } from "react-router-dom";
import './Login.css';

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const [currentuser, setcurrentuser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/users');
            } else {
                
            }
          });
    }, [])

    const logintapped = () => {
        if(email !== "" && password !== "") {
            db.collection('users').where('email','==',email).get().then(allusers => {
                var tmp = [];
                allusers.docs.map(eachuser => {
                    if(eachuser.data().isadmin !== undefined && eachuser.data().isadmin == true) {
                        setcurrentuser(eachuser);
                        auth.signInWithEmailAndPassword(email,password).then(done => {
                            navigate('/users',{user : currentuser});
                        }).catch(err => {
                            alert("Login Failed . Incorrect Email/Password Combination");
                        })
                    }
                    else {
                        alert("You do not have permission to use this tool");
                    }
                })
            })
        }
        else {
            alert("Please enter email and password");
        }
    }
    return (
        <div className="loginpart">
            <div className="innerlogin">
                <h4>SSL Backend Login</h4>
                <input type="email" placeholder="Enter your email" onChange={e => {setemail(e.target.value)}} />
                <input type="password" placeholder="Enter your password" onChange={e => {setpassword(e.target.value)}}/>
                <button onClick={logintapped}>LOGIN</button>
            </div>
        </div>
    )
}

export default Login
