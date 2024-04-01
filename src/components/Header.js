import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user";
import { useNavigate } from "react-router-dom";


const Header = (props) => {
    const {title} = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.value);

    return (
        <nav>
            <div onClick={() => document.getElementById("thenavbar")?.classList.toggle("active")} class="menu_btn mr-1"><img width="32px" src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png" alt=""/></div>
            <div className="flex justify-between w-full align-center">
                <p>{title}</p>
                <p className="text-xs mt-1 text-gray-600">Welcome, {user?.firstName} {user?.lastName}</p>
            </div>
            <button className="text-sm px-4 ml-4 border-l text-red-800" onClick={() => {dispatch(setUser({})); navigate("/")}}>Logout</button>
        </nav>
    )
}

export default Header