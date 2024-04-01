import Layout from "./Layout"
import { makeGetRequest } from "../../request";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";


const Dashboard = () => {
     
    const [candidates, setCandidates] = useState([])    
    const getCandidates = () => {
        var request = {
            what: "getCandidates",
        };
        
        makeGetRequest(request)
          .then((response) => {  
              setCandidates(response.data)
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const [jobs, setJobs] = useState([])    
    const getJobs = () => {
        var request = {
            what: "getJobs",
        };
        
        makeGetRequest(request)
          .then((response) => {  
              setJobs(response.data)
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const [users, setUsers] = useState([])    
    const getUsers = () => {
        var request = {
            what: "getUsers",
        };
        
        makeGetRequest(request)
          .then((response) => {  
              setUsers(response.data)
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    useEffect(() => {
        getCandidates()
        getJobs()
        getUsers()
    }, [])

    const title = "Dashboard"
    return (
        <Layout title={title}>
            <div class="main">
                <section className="shadow-lg">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 h-fit-content text-left p-4">
                        <div className="sm:col-span-2 p-4 bg-blue-50 rounded-md ring-1 ring-blue-200">
                            <p className="text-sm">Total Jobs</p>
                            <p className="text-lg font-semibold mt-2">{jobs.length}</p>
                        </div>
                        <div className="sm:col-span-2 p-4 bg-blue-50 rounded-md ring-1 ring-blue-200">
                            <p className="text-sm">Total Applications</p>
                            <p className="text-lg font-semibold mt-2">{candidates.length}</p>
                        </div>
                        <div className="sm:col-span-2 p-4 bg-blue-50 rounded-md ring-1 ring-blue-200">
                            <p className="text-sm">Total Users</p>
                            <p className="text-lg font-semibold mt-2">{users.length}</p>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default Dashboard