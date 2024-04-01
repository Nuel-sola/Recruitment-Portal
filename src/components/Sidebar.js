import { useNavigate } from "react-router-dom"


const Sidebar = (props) => {
    const {title} = props // same as const title = props.title
    const navigate = useNavigate()
    
    return (
        <div id="thenavbar"  className="sidenav">
            <ul  className="nav-group">
                <div className="flex">
                <span onClick={() => document.getElementById("thenavbar")?.classList.toggle("active")}  className="menu_btn mt-[-5px] ml-[-8px] mr-1">
                        <img width="32px" src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png" alt=""/></span>

                    <p>Recruit <sup>+</sup></p>
                </div>
                <li  className={title === "ashboard" ? "nav-item active" : "nav-item"} onClick={() => navigate("/dashboard")}>
                    <span  className="material-symbols-rounded mr-2">dashboard</span>Dashboard
                </li>
                <li  className={title === "Post Job" ? "nav-item active" : "nav-item"} onClick={() => navigate("/post-job")}>
                    <span  className="material-symbols-rounded mr-2">post_add</span>Post Job
                </li>
                <li  className={title === "Job History" ? "nav-item active" : "nav-item"} onClick={() => navigate("/job-history")}>
                    <span  className="material-symbols-rounded mr-2">history</span>Job History
                </li>
                
            </ul>
        </div>
    )
}

export default Sidebar