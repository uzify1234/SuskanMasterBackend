import React ,{useState,useEffect} from 'react'
import './Fundamentaldata.css';
import readXlsxFile from 'read-excel-file';
import db, { realtimedb } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';

function Fundamentaldata() {
    const [datatime, setdatatime] = useState(null);
    const [existingfile, setexistingfile] = useState("");
    const [issuccessparsing, setissuccessparsing] = useState(false);
    const [errormessage, seterrormessage] = useState("");
    const [alldata, setalldata] = useState([]);
    const [isloading, setisloading] = useState(false);
    const handlefileupload = (e) => {
        readXlsxFile(e.target.files[0], { sheet: 1 }).then((rows) => {
            if(rows[11][0] !== "BSE Symbol") {
                seterrormessage("Wrong format file. BSE Symbol not in place");
                return;
            }
            if(rows[11][1] !== "Company Name") {
                seterrormessage("Wrong format file. Company Name not in place");
                return;
            }
            if(rows[11][29] !== "Sector") {
                seterrormessage("Wrong format file. Sector not in place");
                return;
            }
            if(rows[12][2] !== "Face") {
                seterrormessage("Wrong format file. Face Value not in place");
                return;
            }
            if(rows[12][3] !== "Month/") {
                seterrormessage("Wrong format file. Month/Year not in place");
                return;
            }
            if(rows[12][4] !== "CEqt.") {
                seterrormessage("Wrong format file. CEqt not in place");
                return;
            }
            if(rows[12][5] !== "BkVal") {
                seterrormessage("Wrong format file. BK Val not in place");
                return;
            }
            if(rows[12][6] !== "Sales") {
                seterrormessage("Wrong format file. Sales not in place");
                return;
            }
            if(rows[12][7] !== "NP") {
                seterrormessage("Wrong format file. NP (Audited) not in place");
                return;
            }
            if(rows[12][8] !== "EPS") {
                seterrormessage("Wrong format file. EPS not in place");
                return;
            }
            if(rows[12][9] !== "Div") {
                seterrormessage("Wrong format file. DIV not in place");
                return;
            }
            if(rows[12][10] !== "D/E") {
                seterrormessage("Wrong format file. D/E not in place");
                return;
            }
            if(rows[12][11] !== "RONW") {
                seterrormessage("Wrong format file. RONW not in place");
                return;
            }
            if(rows[12][12] !== "LatQ") {
                seterrormessage("Wrong format file. LatQ not in place");
                return;
            }
            if(rows[12][13] !== "Sales") {
                seterrormessage("Wrong format file. Sales (Latest QTR) not in place");
                return;
            }
            if(rows[12][14] !== "NP") {
                seterrormessage("Wrong format file. NP (Latest QTR) not in place");
                return;
            }
            if(rows[12][15] !== "Year/") {
                seterrormessage("Wrong format file. Year/Month not in place");
                return;
            }
            if(rows[12][16] !== "Sales") {
                seterrormessage("Wrong format file. Sales (Year To Date) not in place");
                return;
            }
            if(rows[12][17] !== "Sales") {
                seterrormessage("Wrong format file. Sales Growth not in place");
                return;
            }
            if(rows[12][18] !== "NP") {
                seterrormessage("Wrong format file. NP (Year To Date) not in place");
                return;
            }
            if(rows[12][19] !== "NP") {
                seterrormessage("Wrong format file. NP Growth not in place");
                return;
            }
            if(rows[12][20] !== "Prom") {
                seterrormessage("Wrong format file. Prom not in place");
                return;
            }
            if(rows[12][21] !== ". Pledged") {
                seterrormessage("Wrong format file. Pledged not in place");
                return;
            }
            if(rows[12][22] !== "Inst.") {
                seterrormessage("Wrong format file. Inst not in place");
                return;
            }
            if(rows[12][23] !== "NoShold") {
                seterrormessage("Wrong format file. NoShold not in place");
                return;
            }
            if(rows[12][24] !== "Mkt.Cap.") {
                seterrormessage("Wrong format file. Mkt Cap not in place");
                return;
            }
            if(rows[12][25] !== "Price") {
                seterrormessage("Wrong format file. Price not in place");
                return;
            }
            if(rows[12][26] !== "52 Week") {
                seterrormessage("Wrong format file. 52 Week HL not in place");
                return;
            }
            if(rows[12][27] !== "Entprise") {
                seterrormessage("Wrong format file. Entprise Value not in place");
                return;
            }
            if(rows[12][28] !== "Trail.P/E") {
                seterrormessage("Wrong format file. Trail P/E not in place");
                return;
            }
            seterrormessage("");

            // var updatedon = rows[9][7];
            // console.log(updatedon);
            // setdatatime(updatedon.split("on")[1]);            
            var olderdata = [];
            setisloading(true);

            var leadsRef = realtimedb.ref('fundamentalanalysisdata');
            leadsRef.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    olderdata.push({bse_symbol : childData.bse_symbol,return : childData.price});
                });
                      
            for(var i=15;i<rows.length;i++) {
                var oldbsesymbol = olderdata.filter(kj => kj.bse_symbol === rows[i][0]).length > 0 ? (olderdata.filter(kj => kj.bse_symbol === rows[i][0])[0].return) : 0;
            var x = {
                bse_symbol: rows[i][0],
                company_name: rows[i][1],
                facevalue: rows[i][2],
                monthyear: rows[i][3],
                ceqt: rows[i][4],
                bkval: rows[i][5],
                salesaudited: rows[i][6],
                np: rows[i][7],
                eps: rows[i][8],
                div: rows[i][9],
                de: rows[i][10],
                ronw: rows[i][11],
                latq: rows[i][12],
                salesyear: rows[i][13],
                npqtr: rows[i][14],
                yearmonth: rows[i][15],
                salesyd: rows[i][16],
                sales_growth: rows[i][17],
                npyd: rows[i][18],
                np_growth: rows[i][19],
                prom: rows[i][20],
                pledged: rows[i][21],
                inst: rows[i][22],
                noshold: rows[i][23],
                mkt_cap: rows[i][24],
                price: rows[i][25],
                f52_week_hl: rows[i][26],
                entprisevalue: rows[i][27],
                trail_pe_ratio: rows[i][28],
                sector: rows[i][29],
                actualrank: -1,
                olderprice : oldbsesymbol === undefined ? 0 : oldbsesymbol,
                oldreturn : oldbsesymbol === undefined ? 0 : oldbsesymbol
            }
            alldata.push(x);
            }
            setisloading(false);    
            });
          })
    }

    const uploadtapped = () => {
        if(alldata.length == 0) {
            return;
        }
        var allpromises = [];

        alldata.sort(function(a, b){
            return b.olderprice-a.olderprice;
        });
        for(var i=0;i<alldata.length;i++){
            alldata[i]["actualrank"] = i+1;
        }
        alldata.map(data => {
            allpromises.push(new Promise((resolve,reject) => {
                const tmpid = ""+data.bse_symbol;
                realtimedb.ref('fundamentalanalysisdata/'+tmpid).set(data , (err) => {
                    if (err) {
                      // The write failed...
                      console.log(err);
                      seterrormessage(err);
                      reject(err);
                    } else {
                      // Data saved successfully!
                      resolve(true);
                    }
                  });
            }));
        })

        setisloading(true);
        Promise.allSettled(allpromises).then(done => {
            alert("Data updated");
            setisloading(false);
            setalldata([]);
            setdatatime("");
            realtimedb.ref('fundamentalanalysisdatafilename/filename').set({'filename' : datatime}).then(fdkj => {
            }).catch(erg => {
            })
        }).catch(err => {
            console.log(err);
            setisloading(false);
        })
    }
    useEffect(() => {
        realtimedb.ref('fundamentalanalysisdatafilename/filename').once('value').then((snapshot) => {
            if(snapshot.val()) {
                setexistingfile(snapshot.val().filename);
            }
        });
    }, [])

    return (
        <div className='fundamentaldata'>
            <h4>Currently Uploaded File :{existingfile}</h4>
            <h4>Please only upload XLSX file, XLS file will not work.</h4>
            <h4>To convert XLS file into XLSX <a href="https://www.zamzar.com/convert/xls-to-xlsx/" target="_blank">Click Here</a></h4>
            <h3>Upload new file</h3>
            <h4>Data as on</h4>
            <input type="text" value={datatime} placeholder="Enter data period" onChange={(e) => setdatatime(e.target.value)} />
            <h4>Upload Excel File</h4>
            <input type="file" id="datafile" onChange={handlefileupload} />
            <h4 style={{color :'red'}}>{errormessage}</h4>
            {!isloading && <button onClick={uploadtapped}>Upload Data</button>}
            {isloading && <h3>Please wait while we are updating, this might take a while</h3>}
            <a href="/Vol3708DataBank.xlsx" download style={{color :"black",marginTop : 50}}>
                <h4>Download Sample File</h4>
            </a>
        </div>
    )
}

export default Fundamentaldata
