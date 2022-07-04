import React, {useState,useEffect} from 'react'
import './Users.css';
import ReactSearchBox from "react-search-box";
import Loader from '../helpers/Loader';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import db, { auth } from '../Firebase/Firebase';
import { useNavigate, useParams } from "react-router-dom";

const customStyles = {
    content: {
    borderWidth : '3px',
    borderColor : '#143943',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function Users() {

    const navigate = useNavigate();
    var {uid} = useParams();
    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [arn, setarn] = useState("");
  const [needrefresh, setneedrefresh] = useState(false)

    const [allusers, setallusers] = useState([]);
    const [filteredusers, setfilteredusers] = useState([]);
    const [usertypeshowing, setusertypeshowing] = useState("All");
    const [addusertypeshowing, setaddusertypeshowing] = useState("VC");

    const [isloading, setisloading] = useState(false);
    const searchselected = (e) => {
        console.log(e);
    }
    const searchchanged = (e) => {
        var tmpusers = allusers.filter(user => user.firstname.toLowerCase().includes(e.toLowerCase()) || user.lastname.toLowerCase().includes(e.toLowerCase()) || user.email.toLowerCase().includes(e.toLowerCase()) || user.city.toLowerCase().includes(e.toLowerCase()));
        if(usertypeshowing === "All"){
            setfilteredusers(tmpusers);
        }
        else {
            setfilteredusers(tmpusers.filter(eachuser => eachuser.usertype == usertypeshowing));
        }
    }
    const setusertypedisplaying = (e) => {
        setusertypeshowing(e.target.value);
        e.target.value == "All" ? setfilteredusers(allusers) : setfilteredusers(allusers.filter(eachuser => eachuser.usertype == e.target.value));
    }
    const setaddusertypedisplaying = (e) => {
        setaddusertypeshowing(e.target.value);
    }
    const addusertapped = () => {
        if(firstname !== "" && email !== "" && password !== "" && mobile !== "") {
            setisloading(true);
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              var user = userCredential.user;
              db.collection('users').doc(user.uid).set({
                  firstname : firstname,
                  lastname : lastname,
                  email : email,
                  address : address,
                  mobile : mobile,
                  arn : arn,
                  city : city,
                  usertype : addusertypeshowing,
                  createdon : Math.floor(Date.now() / 1000),
                  isactive : true
              }).then(done => {
                  alert("User Created");
                  setneedrefresh(!needrefresh);
                  closeModal();
                  setisloading(false);
                  setfirstname("");
                  setlastname("");
                  setemail("");
                  setpassword("");
                  setaddress("");
                  setarn("");
                  setcity("");
                  setmobile("");
              }).catch(err => {
                setisloading(false);
              })
            })
            .catch((error) => {
              setisloading(false);
              alert("Could not create user");
            });
        }
        else {
            setisloading(false);
            alert("Firstname, Mobile, Email and Password are mandatory field");    
        }
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
        } else {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        db.collection('users').orderBy('createdon','desc').get().then(allusers => {
            var tmp = [];
            allusers.docs.map(eachuser => {
                tmp.push({id : eachuser.id , ...eachuser.data()});
            })
            setallusers(tmp);
            setfilteredusers(tmp);
        })
    }, [needrefresh])

    const searchtextchanged = (e) => {
        var text = e.target.value;
        
        if(text === "") {
            setfilteredusers(allusers);
        }
        else {
            var tmphold = [];
            allusers.map(eachuser => {
                if(eachuser.city?.toLowerCase().includes(text.toLowerCase()) || eachuser.email?.toLowerCase().includes(text.toLowerCase()) || eachuser.firstname?.toLowerCase().includes(text.toLowerCase()) || eachuser.lastname?.toLowerCase().includes(text.toLowerCase())) {
                    tmphold.push(eachuser);
                }
            })
            setfilteredusers(tmphold);
        }
    }

    return (
        <div className="users">
            {isloading && <Loader />}

            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add user"
      >
        <h3>Add new user</h3>
        <div className="layoutform" style={{display : 'flex',flexDirection : 'column'}}>
        <input type="text" placeholder="Enter firstname" onChange={e => setfirstname(e.target.value)}/>
        <input type="text" placeholder="Enter lastname" onChange={e => setlastname(e.target.value)}/>
        <input type="email" placeholder="Enter email" value={email} onChange={e => setemail(e.target.value.toLowerCase())}/>
        <input type="number" placeholder="Enter Mobile" onChange={e => setmobile(e.target.value)}/>
        <input type="password" placeholder="Enter password" onChange={e => setpassword(e.target.value)}/>
        <input type="text" placeholder="Enter address" onChange={e => setaddress(e.target.value)}/>
        <input type="text" placeholder="Enter arn" onChange={e => setarn(e.target.value)}/>
        <input type="text" placeholder="Enter city" onChange={e => setcity(e.target.value)}/>
        <h4>User type</h4>
        <select onChange={setaddusertypedisplaying}>
            <option selected={usertypeshowing === "VC"}>VC</option>
            <option selected={usertypeshowing === "FFF Pro"}>FFF Pro</option>
            {/* <option selected={usertypeshowing === "Both VC and Pro"}>Both VC and FFF Pro</option> */}
        </select>
        <button onClick={addusertapped}>Add user</button>
        </div>
        





      </Modal>
            <div className='linear'>
                <h4>{usertypeshowing} users</h4>
                <select onChange={setusertypedisplaying}>
                    <option>All</option>
                    <option>VC</option>
                    <option>FFF Pro</option>
                    <option>FFF Pro Trial
                    </option>
                </select>
                <button onClick={openModal}>Add user</button>
                <div className="searchholderregion">
                    <input style={{padding :10, borderRadius : 5,borderWidth : 2 ,borderColor : 'black'}} type="text" placeholder="search here" onChange={searchtextchanged} />
                </div>
            </div>

            <div className="results">
                {
                    filteredusers.length > 0 && filteredusers.map(eachuser => {
                        return(
                            <div className="eachuser">
                                <h4>{eachuser.firstname} {eachuser.lastname}</h4>
                                <h4>{eachuser.email}</h4>
                                <h4>{eachuser.mobile}</h4>
                                <h4>{eachuser.usertype}</h4>
                                <h4>{eachuser.isactive ? 'Active' : 'Blocked'}</h4>
                                <button onClick={e => {navigate(`/user/${eachuser.id}`)}}>Edit</button>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}

export default Users
