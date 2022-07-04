import React , {useState,useEffect} from 'react';
import db from '../Firebase/Firebase';
import './Mutualfundspick.css';

function Mutualfundspick() {

    const [alldata, setalldata] = useState([]);

    useEffect(() => {
        var tmp = [];
       db.collection('mutualfundspick').orderBy('addedon','desc').get().then(alldocs => {
           alldocs.docs.map(each => {
            tmp.push({id : each.id, ...each.data()});
           })
           setalldata(tmp);
       })
    }, [])

    return (
        <div className='mutualfundspick'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ARN</th>
                        <th>Mobile</th>
                        <th>Largecap 1</th>
                        <th>Largecap 2</th>
                        <th>Midcap 1</th>
                        <th>Midcap 2</th>
                        <th>Smallcap 1</th>
                        <th>Smallcap 2</th>
                        <th>Asset Allocator</th>
                        <th>Bullish</th>
                        <th>International Fund</th>
                        <th>Longterm Debt</th>
                        <th>Shortterm Debt</th>
                        <th>Suggested Debt</th>
                        <th>Suggested ETF</th>
                        <th>Suggested Hybrid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alldata.map(each => {
                            return (
                                <tr>
                                    <td>{each.name}</td>
                                    <td>{each.arn}</td>
                                    <td>{each.mobile}</td>
                                    <td>{each.largecap1}</td>
                                    <td>{each.largecap2}</td>
                                    <td>{each.midcap1}</td>
                                    <td>{each.midcap2}</td>
                                    <td>{each.smallcap1}</td>
                                    <td>{each.smallcap2}</td>
                                    <td>{each.assetallocator}</td>
                                    <td>{each.bullish}</td>
                                    <td>{each.internationalfund}</td>
                                    <td>{each.longtermdebt}</td>
                                    <td>{each.shorttermdebt}</td>
                                    <td>{each.suggesteddebt}</td>
                                    <td>{each.suggestedetf}</td>
                                    <td>{each.suggestedhybrid}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Mutualfundspick
