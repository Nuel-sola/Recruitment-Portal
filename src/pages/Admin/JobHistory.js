import { useNavigate } from "react-router-dom"
import Layout from "./Layout"
import { useDispatch } from "react-redux"
import { setPageContext } from "../../store/pageContext"
import { useEffect, useState } from "react"
import { makeDeleteRequest, makeGetRequest } from "../../request"
import { toast, ToastContainer } from 'react-toastify';


const JobHistory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [jobs, setJobs] = useState([])
    const getPostedJobs = () => {
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

    const deleteJob = (id) => {
        var request = {
            what: "deleteJob",
            id: id
        };
        
        makeDeleteRequest(request)
          .then((response) => { 
                toast.success("Job Deleted Successfully!")
                getPostedJobs() // Refresh table
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const rows = jobs.map((record, index) => {
        return (
            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <td class="px-6 py-2">{index+1}</td>
                <td scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {record.jobTitle}
                </td>
                <td class="px-6 py-2 text-nowrap">{record.jobCode}</td>
                <td class="px-6 py-2">{record.location}</td>
                <td class="px-6 py-2">{record.createdDate.split('T')[0]}</td>
                <td class="px-6 py-2">{record.closingDate}</td>
                <td class="px-6 py-2 flex " style={{width: "156px"}}>
                    <div className="dropdown">
                    <button className="dropbtn-2"><span className="material-symbols-outlined text-[24px] font-bold">more_horiz</span></button>
                        <div className="dropdown-content">
                            <button onClick={() => navigate("/edit-job/"+record._id)}>Edit</button>
                            <button 
                                onClick={() => {dispatch(setPageContext({title: record.jobTitle, code: record.jobCode, jobId: record._id})); navigate("/candidates/"+(record.jobTitle).toLowerCase().replaceAll(" ", "-"))}}
                                >View Candidates</button>
                            <button onClick={() => deleteJob(record._id)}>Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
        )
    })

    useEffect(() => {
        getPostedJobs()
    }, [])

    const title = "Job History"
    return (
        <Layout title={title}>
            <div class="main">
                <section className="shadow-lg">
                    <div class="relative " style={{minHeight: "100vh"}}>
                        <table class="w-full text-xs text-left  text-gray-500 dark:text-gray-400">
                            <thead class="text-xs border-b text-gray-600 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        SN
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Job Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Job Code
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Created Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Closing Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { rows }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default JobHistory