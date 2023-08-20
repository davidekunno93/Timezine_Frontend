import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const Navigation = () => {
    const { user, setUser } = useContext(DataContext);

    const showLogout = () => {
        let element = document.getElementById('logout-display')
        element.classList.toggle('d-none')
    }

    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        // navigate('/') reminder: you cannot use navigate functionality within a Link connected funtion
    }

    return (
        <div className="navbar mb-4">
            {user ? <>
            <div id="logout-display" className="nav-extra abs pad8 d-none"><Link onClick={() => logout()} to="/" >Logout</Link></div>
            <img onClick={() => showLogout()} className="profile-img abs" src="/images/profile.png" />
            <p className="center-text m0 mt-2">Welcome, David's {user.relationship.charAt(0).toUpperCase() + user.relationship.slice(1)}</p>
                <div className="nav-options flx-r just-se">
                    <Link to='/dashboard' className="black-text"><p className="m0 mt-1">Dashboard</p></Link>
                    <Link to='/mycities' className="black-text"><p className="m0 mt-1">My Cities</p></Link>
                </div>
            </>
                :
                <>
                    <div className="nav-options flx-r just-se">
                        <Link to='/register' className="black-text"><p className="m0 mt-4">Sign Up</p></Link>
                        <Link to='/' className="black-text"><p className="m0 mt-4">Sign In</p></Link>
                    </div>
                </>}
        </div>
    )
}
export default Navigation;