import { useSelector } from "react-redux"
import Layout from "./Layout"
import { useNavigate, useParams } from "react-router-dom";
import { makeDeleteRequest, makeGetRequest } from "../../request";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";


const JobCandidate = () => {
    const navigate = useNavigate()
    const pageContext = useSelector(state => state.pageContext.value);
    const param = useParams()

    const [candidates, setCandidates] = useState([])    
    const getCandidates = () => {
        var request = {
            what: "getCandidates",
        };
        
        makeGetRequest(request)
          .then((response) => {  
              setCandidates(response.data.filter(record => record.jobId === pageContext.jobId))
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const deleteCandidate = (id) => {
        var request = {
            what: "deleteCandidate",
            id: id
        };
        
        makeDeleteRequest(request)
          .then((response) => { 
                toast.success("Candidate Deleted Successfully!")
                getCandidates()
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const rows = candidates.map((record, index) => (
        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
            <td class="px-6 py-2">{index+1}</td>
            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {record.firstName} {record.lastName}
            </th>
            <td class="px-6 py-2">{record.email}</td>
            <td class="px-6 py-2">{record.mobileNumber}</td>
            <td class="px-6 py-2">{record.country}</td>
            <td class="px-6 py-2">{record.createdDate.split('T')[0]}</td>
            <td class="px-6 py-2 flex gap-4">
                <div className="dropdown">
                    <button className="dropbtn-2"><span className="material-symbols-outlined text-[24px] font-bold">more_horiz</span></button>
                    <div className="dropdown-content">
                        <button onClick={() => navigate(`/candidates/${param.title}/${record._id}/resume`)}>View Resume</button>
                        <button onClick={() => deleteCandidate(record._id)}>Delete</button>
                    </div>
                </div>
            </td>
        </tr>
    ))

    useEffect(() => {
        getCandidates()
    }, [])

    const title = "Job History"
    return (
        <Layout title={title}>
            <div class="main">
                <section className="shadow-lg">
                    <div className="flex justify-between p-4">
                        <p className="text-blue-600 text-sm cursor-pointer" onClick={() => navigate("/job-history")}>Back</p>
                        <p className="text-sm font-semibold text-gray-800">{ pageContext.title } - <span className="">{ pageContext.code }</span></p>
                        <p></p>
                    </div>
                    <div class="relative overflow-x-auto rounded-md" style={{minHeight: "100vh"}}>
                        <table class="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs border-b border-t text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        SN
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email Address
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Mobile Number
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Created Date
                                    </th>
                                    <th scope="col" class="px-6 py-3" style={{width: "148px"}}>
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

export default JobCandidate