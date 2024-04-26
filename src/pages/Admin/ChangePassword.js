import Layout from "./Layout"
import { makePutRequest } from "../../request";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/user";



const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const param = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user.value);

    const [formData, setFormData] = useState({
        rePassword: "",
        password: ""
    })

    const [users, setUsers] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const UpdatePassword = (e) => {
        e.preventDefault();

        console.log(user)
        if(formData.password !== formData.rePassword){
            toast.error('password and confirm password did not match');
            return;
        }


        var request = {
            what: "editpassword",
            data: formData,
            id: user.sessionKey
        };
        setIsLoading(true)
        makePutRequest(request)
        .then((response) => {
            toast.success("Password Updated Successfully!")
            setIsLoading(false)
        })
        .catch((error) => {
            toast.error("An error occured!")
            setIsLoading(false)
        });

    };

    const title = "Change Password"
    return (
        <Layout title={title}>
            <div class="main">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Change Your Password</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={UpdatePassword}>
                            <div>
                                <label for="repassword" className="block text-sm font-medium leading-6 text-gray-900 text-left">Password</label>
                                <div className="mt-2">
                                    <input id="repassword" name="password" onChange={handleChange} type="password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900 text-left">Confirm Password</label>

                                <div className="mt-2">
                                    <input id="password" name="password" onChange={handleChange} type="password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Change Password</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">


                        </p>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </Layout>
    )
}

export default ChangePassword