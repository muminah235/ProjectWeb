import { useState ,response} from 'react';
import Axios from 'axios'
export default function ShowPharmacist() {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newName, setNewName] = useState("");
    const [newSurname, setNewSurname] = useState("");
    const [pharmaList, setPharmaList] = useState([]);
    const [pharmaEdit,setpharmaEdit] = useState([]);

    const getPharmacist = () => {
        Axios.get('http://localhost:4002/pharmacist').then((response) => {
            setPharmaList(response.data);
            console.log(pharmaList);
            console.log(response);
        })
    }
    const editPharmacist = (Pharma_ID) => {
        Axios.put('http://localhost:4002/PharmaEdit',{
            Pharma_ID: Pharma_ID
        }).then((response) => {
            setpharmaEdit(response.data);
            console.log(pharmaEdit);
            console.log(response);
        })
    }

    const updatePharmacist = (Pharma_ID) => {
        Axios.put("http://localhost:4002/updatePharmacist", {
            Username: newUsername || pharmaEdit[0].Username,
            Password: newPassword || pharmaEdit[0].Password,
            Pharma_fname: newName || pharmaEdit[0].Pharma_fname,
            Pharma_lname: newSurname || pharmaEdit[0].Pharma_lname,
            Pharma_ID: Pharma_ID
        })
        .then((response) => {
            alert("update");
            setPharmaList(
                pharmaList.map((val) => {
                    return val.Pharma_ID == Pharma_ID ? {
                        Username: newUsername || val.Username,
                        Password: newPassword || val.Password,
                        Pharma_fname: newName || val.Pharma_fname,
                        Pharma_lname: newSurname || val.Pharma_lname,
                        Pharma_ID: Pharma_ID
                    } : val;
                })
            )


        })
    }

    const deletePharmacist = (Pharma_ID) => {
        Axios.delete(`http://localhost:4002/deletePharmacist/${Pharma_ID}`).then((reponse) => {
            setPharmaList(
                pharmaList.filter((val) => {
                    return val.Pharma_ID != Pharma_ID;
                })
            )
        })
    }
    return(
        <dir className="pharmasict">
        <h1>Phamacist</h1>
        <button className="btn btn-primary" onClick={getPharmacist}>Show Pharmacist</button>
        {pharmaList.map((val,key)=>{
        return(
            <div className="customer card">
            <div className="card-body terxt-left">
              <p className="card-text">Username:{val.Username}</p>
              <p className="card-text">Password:{val.Password}</p>
              <p className="card-text">Name:{val.Pharma_fname}</p>
              <p className="card-text">Surname:{val.Pharma_lname}</p>
            </div>
            <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" defaultValue={val.Username} style={{ width: "300px" }} className="form-control" onChange={(event) => {setNewUsername(event.target.value) }} />

                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  defaultValue={val.Password}  style={{ width: "300px" }} className="form-control" placeholder="Enter password" onChange={(event) => { setNewPassword(event.target.value) }} />

                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" defaultValue={val.Pharma_fname} style={{ width: "300px" }} className="form-control" placeholder="Enter name" onChange={(event) => { setNewName(event.target.value) }} />
                    
                    <label htmlFor="surname" className="form-label">Surname</label>
                    <input type="text" defaultValue={val.Pharma_lname}  style={{ width: "300px" }} className="form-control" placeholder="Enter surname" onChange={(event) => { setNewSurname(event.target.value) }} />
                    <button className="btn btn-warning" onClick={() => { editPharmacist(val.Pharma_ID) }}>Edit</button>
                    <button className="btn btn-warning" onClick={() => { updatePharmacist(val.Pharma_ID) }}>Update</button>
                    <button className="btn btn-danger" onClick={() => { deletePharmacist(val.Pharma_ID) }}>Delete</button>
            </div>

            </div> 
        )
          
        })}
    </dir>
    )
    
}