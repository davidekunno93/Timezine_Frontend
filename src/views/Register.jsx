import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState(null)
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
            const resp = axios.post("http://localhost:5000/register", JSON.stringify(data), {
                headers : {"Content-Type": "application/json"}
            })
            .then(resp => handleData(resp))
        }
    }

    const handleData = (resp) => {
        console.log(resp.data)
        if (resp.data.message === "userCreated") {
            // setUser(resp.data.data)
            alert("Account created successfully")
            navigate('/')
        } else if (resp.data.message === "nameExists") {
            alert("User with this name already exists. Please choose a different one")
        } else if (resp.data.message === "relationshpExists") {
            alert("User with this relationship to David already exists. Please choose a different one")
        }
        
    }

    return (
        <>
            <div className="center-text">
                <h3 className="m0 mb-2">Enter your name</h3>
                <input onChange={(e) => updateName(e)} type="text" className="name-input" placeholder="Name" />
                <h3 className="m0 mt-4 mb-2">What is your relationship to David?</h3>
                <input onChange={(e) => updateRelationship(e)} type="text" className="name-input" placeholder="Friend" />
            </div>
            <button onClick={() => handleSubmit()} className="center green-btn mt-4">Register</button>
            <div className="center-text"><Link to="/">Already have an account?</Link></div>
        </>
    )
}
export default Register;