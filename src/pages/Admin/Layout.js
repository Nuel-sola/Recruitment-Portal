import { useEffect } from "react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title}) => {
    const navigate = useNavigate()
    // if user is empty, isAuthenticated = false
    // if user containes user details, isAuthenticated = true
    const isAuthenticated = useSelector((state) => state.user.value);

    useEffect(() => {
        if(!isAuthenticated) navigate('/')
    }, [])

    return (
        <>
            <Header title={title} />
            <Sidebar title={title} />
            <div class="container">
                {children}
            </div>
            
        </>
    )
}

export default Layout