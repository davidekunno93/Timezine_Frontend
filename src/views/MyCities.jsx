import { useContext, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";


const MyCities = () => {
    const { user, setUser } = useContext(DataContext);

    const getData = async () => {
        let data = user.saved
        const resp = await axios.post("http://localhost:5000/my-cities", JSON.stringify(data), {
            headers : {"Content-Type": "application/json"}
        })
        return resp.status === 200 ? resp.data : null
    }

    const loadData = async () => {
        let data = await getData()
            .then(data => handleData(data))
    }

    const handleData = (data) => {
        if (!user) {
            setCities()
        } else {
            console.log(data);
            setCities(data.data)
        }
    }

    const [cities, setCities] = useState(() => loadData());

    const toggleTime = (feed, key) => {
        let time12 = document.getElementById(`time12-${key}`)
        let time24 = document.getElementById(`time24-${key}`)
        let toggle12 = document.getElementById(`toggle12-${key}`)
        let toggle24 = document.getElementById(`toggle24-${key}`)
        if (feed === "twelve") {
            time12.classList.remove('d-none')
            time24.classList.add('d-none')
            toggle24.classList.add('faded')
            toggle12.classList.remove('faded')
        } else if (feed === "twentyfour") {
            time24.classList.remove('d-none')
            time12.classList.add('d-none')
            toggle12.classList.add('faded')
            toggle24.classList.remove('faded')
        }
    }

    const removeCity = async (city_name) => {
        let data = {"user_id": user.id, "city_name": city_name}
        const resp = await axios.post('http://localhost:5000/remove-city', JSON.stringify(data), {
            headers : {"Content-Type": "application/json"}
        })
        .then(resp => handleCity(resp))
    }

    const handleCity = (resp) => {
        console.log(resp.data)
        setUser(resp.data.data)
    }

    return (
        <>
        <div className="empty-2"></div>
        <h1 className="center-text">My Cities</h1>
        <h5 className="center-text m0">Cities added to your watchlist:</h5>

        <div className="card-table flx-r flx-wrap just-se">
        {Array.isArray(cities) ? (cities.length > 0 ? cities.map((c, i) => {
            return <div key={i} className="time-card2 flx-c rel mx-3 my-4">
            {user.saved.indexOf(c.city.toLowerCase()) > -1 ? <div onClick={() => removeCity(c.city)} className="center-text remove-press abs">Remove</div> : <img onClick={() => addCity(c.city)} className="add-img abs" src="/images/plus-black-blue.png" />}
            <div className=" flx-1">
                <p className="city">{c.city}</p>
                <p className="weather">weather</p>
            </div>
            <div className=" flx-3">
                <div className="flx-r">
                    <div className="flx-c flx-5">
                        <p id={`time12-${i}`} className="time2">{c.time12}</p>
                        <p id={`time24-${i}`} className="time2 d-none">{c.time24}</p>
                        <p className="day">{c.date_formatted}</p>
                    </div>
                    <div className=" format-toggle flx-1 pt-3h">
                        <div id={`toggle24-${i}`} onClick={() => toggleTime("twentyfour", i)} className="center-text faded">24hr</div>
                        <hr className="wide80" />
                        <div id={`toggle12-${i}`} onClick={() => toggleTime("twelve", i)} className="center-text">12hr</div>
                    </div>
                </div>
            </div>
            <div className=" flx-1"><p className="timezone gray-text small">Timezone: {c.timezone}</p></div>
        </div>


    }) : <div className="center-text">You haven't saved any cities to your watchlist yet! <br />Go to the <Link to="/dashboard">dashboard</Link> and add a few.</div>) : <h3><FontAwesomeIcon icon={faSpinner} spin />&nbsp;Loading...</h3>}

</div>
        
</>
    )
}
export default MyCities;