import { useState } from "react";
import { makePostRequest } from "../../request";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const CreateUser = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target

    setFormData({...formData, [name]: value})
  }
  
  const CreateUser = (event) => {
    event.preventDefault()
    console.log(formData)
    var request = {
        what: "createUser",
        data: {
          "firstName": formData.firstName,
          "lastName": formData.lastName,
          "email": formData.email,
          "password": formData.password,
          "role": formData.role
        }
        // params: {  }
    };
    
    makePostRequest(request)
      .then((response) => {
          console.log("User Created Successfully!") 
          toast.success("User Created Successfully! Please Login")
          navigate("/")            
      })
      .catch((error) => {
          console.log(error)
      });
  }

  // useEffect(() => {
  //   GetUsers()
  // }, [])

  return (
      <div  className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div  className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-xl text-blue-600 font-semibold">Recruit <sup>+</sup></p>
          <h2  className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
        </div>

        <div  className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  className="space-y-4" onSubmit={CreateUser}>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label for="firstName"  className="block text-sm font-medium leading-6 text-gray-900 text-left">First Name <span className="text-red-400">*</span></label>
                <div  className="mt-2">
                  <input id="firstName" name="firstName" onChange={handleChange} type="text" autocomplete="firstName" required  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label for="lastName"  className="block text-sm font-medium leading-6 text-gray-900 text-left">Last Name <span className="text-red-400">*</span></label>
                <div  className="mt-2">
                  <input id="lastName" name="lastName" onChange={handleChange} type="text" autocomplete="lastName" required  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                </div>
              </div>
            </div>

            <div>
              <label for="email"  className="block text-sm font-medium leading-6 text-gray-900 text-left">Email address</label>
              <div  className="mt-2">
                <input id="email" name="email" onChange={handleChange} type="email" autocomplete="email" required  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-left text-sm font-medium leading-6 text-gray-900">
                  Role <span className="text-red-400">*</span>
              </label>
              <div className="mt-2">
                  <select
                  id="role"
                  name="role"
                  onChange={handleChange}
                  value={formData.role}
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                  <option value="" disabled>Select...</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  </select>
              </div>
            </div>

            <div>
              <label for="password"  className="block text-sm font-medium leading-6 text-gray-900 text-left">Password <span className="text-red-400">*</span></label>

              <div  className="mt-2">
                <input id="password" name="password" onChange={handleChange} type="password" autocomplete="current-password" required  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <button type="submit"  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Create Account</button>
            </div>
          </form>

          <p  className="mt-8 text-center text-sm text-gray-500">
            Have an account?
            <a href="#" onClick={() => navigate("/")}  className="font-semibold leading-6 text-blue-600 hover:text-blue-500 ml-2">Sign in</a>
          </p>
        </div>
      </div>
  )
}

export default CreateUser