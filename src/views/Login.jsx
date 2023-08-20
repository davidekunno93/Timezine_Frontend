import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const Login = () => {
    const { user, setUser } = useContext(DataContext);
    const [name, setName] = useState(null)
    const [relationship, setRelationship] = useState(null)
    
    const navigate = useNavigate()

    const updateName = e => {
        setName(e.target.value);
    }

    const updateRelationship = e => {
        setRelationship(e.target.value);
    }

    const handleSubmit = async () => {
        if (!name) {
            alert("Please enter a name")
        } else if (!relationship) {
            alert("Please enter your relationship to David")
        } else { 
            let data = {"name": name, "relationship": relationship}
            const resp = axios.post("http://localhost:5000/login", JSON.stringify(data), {
                headers : {"Content-Type": "application/json"}
            })
            .then(resp => handleData(resp))
        }
    }

    const handleData = (resp) => {
        console.log(resp.data)
        if (resp.data.message === "userFound") {
            setUser(resp.data.data)
            alert("Logged in successfully")
            navigate('/dashboard')
        } else if (resp.data.message === "nameNotFound") {
            alert("No user found with this name")
        } else if (resp.data.message === "relationshipWrong") {
            alert("Wrong relationship was entered")
        }
        
    }


    return (
        <>
            <div className="center-text">
                <h1>LOGIN</h1>
                <h3 className="m0">Name:</h3>
                <input onChange={(e) => updateName(e)} type="text" className="name-input" placeholder="Name" />
                <h3 className="m0 mt-4">Relationship:</h3>
                <input onChange={(e) => updateRelationship(e)} type="text" className="name-input" placeholder="Relationship to David" />
            </div>
            <button onClick={() => handleSubmit()} className="black-btn center mt-4">Login</button>
            <div className="center-text"><Link to="/register">Create an account?</Link></div>
        </>
    )
}
export default Login;