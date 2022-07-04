import React , {useState,useEffect} from 'react';
import db from '../Firebase/Firebase';
import './Monthlyreviews.css';

function Monthlyreviews() {

    const [alldata, setalldata] = useState([]);

    useEffect(() => {
        var tmp = [];
       db.collection('monthlyreviews').orderBy('createdAt','desc').get().then(alldocs => {
           alldocs.docs.map(each => {
            tmp.push({id : each.id, ...each.data()});
           })
           setalldata(tmp);
       })
    }, [])

    return (
        <div className='monthlyreviews'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Month</th>
                        <th>IAP/VG</th>
                        <th>No of people attended your IAP</th>
                        <th>No of Financial Plans</th>
                        <th>No of classrooms training done</th>
                        <th>No of active clients you had last month</th>
                        <th>No of new clients added last last month</th>
                        <th>New SIP in previous month</th>
                        <th>Running SIP in previous month</th>
                        <th>AUM as on last date of previous month</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata.map(each => {
                            return (
                                <tr>
                                    <td>{each.name}</td>
                                    <td>{each.email}</td>
                                    <td>{each.mobile}</td>
                                    <td>{each.month}</td>
                                    <td>{each.one}</td>
                                    <td>{each.two}</td>
                                    <td>{each.three}</td>
                                    <td>{each.four}</td>
                                    <td>{each.five}</td>
                                    <td>{each.six}</td>
                                    <td>{each.seven}</td>
                                    <td>{each.eight}</td>
                                    <td>{each.nine}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Monthlyreviews
