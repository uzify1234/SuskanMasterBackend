import React from 'react'
import './Uploadusers.css';
import readXlsxFile from 'read-excel-file';
import db, { auth } from '../Firebase/Firebase';

 function Uploadusers() {

    const filechanged = (e) => {
        var allpromises = [];
         readXlsxFile(e.target.files[0], { sheet: 1 }).then(async (rows) => {
            for(var i = 1;i < rows.length;i++)
            {
                var fullname = rows[i][0].split(" ");
                var lastname = fullname[fullname.length - 1];
                var firstname = "";
                
                for(var j=0;j<fullname.length - 1;j++)
                {
                    firstname = firstname + fullname[j];
                }
                var person = {
                    'firstname' : firstname,
                    'lastname' : lastname,
                    'mobile' : rows[i][1],
                    'email' : rows[i][2],
                    'dob' : rows[i][3],
                    'arn' : rows[i][4],
                    'city' : rows[i][5],
                    'state' : rows[i][6],
                    'address' : rows[i][7],
                    'createdon' : Math.floor(Date.now() / 1000),
                    'isactive' : true,
                    'isadmin' : false,
                    'usertype' : 'VC',
                    'isprofileverified' : true
                }
                await handlemiddleware(person.email,person);
        
                
            }
     
          });

     
    }


const handlemiddleware = async (email,person) => {
    auth.getUserByEmail(email).then((user) => {
        console.log(user);
    })
    auth.signInWithEmailAndPassword(email,'volatilitygame123').then(async (user) => {
        if(user.user) {
             await db.collection('users').doc(user.user.uid).set(person).then(async done => {
                await auth.signOut();
            }).catch(err => {
            })
        }
    }).catch(err => {
    })
}

    return (
        <div className="uploadusers">
            <h3>Upload Excel File</h3>
            <input type="file" onChange={filechanged}/>
        </div>
    )
}

export default Uploadusers
