import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import HTMLContent from "./HTMLContent"
import { makeDeleteRequest, makeGetRequest, makePostRequest } from "../request"
import { toast, ToastContainer } from 'react-toastify';
import { formatDateAgo, formatSalary, removeHtmlTags, todaysDate } from "../helpers";
import { useNavigate } from "react-router-dom";


const FindJob = () => {
    const navigate = useNavigate()
    const [toggleTab, setToggleTab] = useState(false)

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

    const [job, setJob] = useState({})
    const [jobId, setJobId] = useState("")
    const getJobById = (id) => {
        var request = {
            what: "getJobById",
            id: id
        };
        
        makeGetRequest(request)
          .then((response) => {  
              setJob(response.data)
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        country: "",
        resume: "",
        jobId: "",
        createdDate: todaysDate(),
    })

    const [isLoading, setIsLoading] = useState(false)
    const SubmitApplication = (event) => {
        event.preventDefault()
        formData.jobId = jobId
        // console.log(formData)
        const isFormReady = !!removeHtmlTags(formData.resume)

        if(Object.values(formData).every(value => value) && isFormReady) { // valid form fields
            var request = {
                what: "submitApplication",
                data: formData
            };
            setIsLoading(true)
            makePostRequest(request)
              .then((response) => {
                toast.success("Application Submitted Successfully!")   

                setToggleTab(false)  
                getJobById(jobId)  
                getCandidates()     
                setToggleTab(false)   
                setIsLoading(false)
              })
              .catch((error) => {
                  toast.error("An error occured!")
                  setIsLoading(false)
              });
        }
        else toast.warning("Kindly provide information for all required fields!")
        
    }

    const clearForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            country: "",
            resume: "",
            jobId: "",
            createdDate: todaysDate(),
        })
    }

    const deleteCandidate = (id) => {
        var request = {
            what: "deleteCandidate",
            id: id
        };
        
        makeDeleteRequest(request)
          .then((response) => { 
                toast.success("Application Withdrawn Successfully!")
                getJobs()
                getCandidates()
                setToggleTab(false)
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    const rows = jobs.map((record, index) => {
        return (
            <button 
                onClick={() => {getJobById(record._id); setJobId(record._id); setToggleTab(false)}}
                key={index} 
                className={`rounded-md mb-4 ring-1 ring-gray-200 flex justify-between p-4 items-start cursor-pointer text-left w-full ${ jobId === record._id ? "button-active" : "" }`}>
                <div className="flex gap-4">
                    <div><img src={record.companyLogo} alt="" width="36px" height="36px" /></div>
                    <div>
                        <p className="font-lg font-semibold text-gray-800">{record.jobTitle}</p>
                        <div className="text-xs mt-1"><span className="font-semibold text-gray-800">{record.companyName}</span> . <span className="text-gray-500">{record.jobType} . </span> <span className="text-blue-600">${formatSalary(record.minSalary)} - {formatSalary(record.maxSalary)}/yr</span></div>

                        <p className="text-gray-600 text-xs mt-3">{record.location}</p>
                    </div>
                </div>
                <p className="text-gray-400 text-xs text-right text-nowrap"> { formatDateAgo(record.createdDate) } </p>
            </button>
        )
    }) 

    const handleQuill = (html) => setFormData({ ...formData, "resume" : html, });

    const handleChange = (e) => {
        const {name, value} = e.target
    
        setFormData({...formData, [name]: value})
    }
    
    useEffect(() => {
        getJobs();
        getCandidates()
    }, [])

    const title = ""
    return (
        <div>
            <section className="bg-gray-50 h-fit-content p-6 text-left border-b">
                <p className="text-xs text-gray-500">TECH INDUSTRY</p>
                <h2 className="text-3xl my-2 font-semibold">Top Software Jobs</h2>
                <p className="text-sm text-gray-500">Choose from over <span className="text-blue-600">100 software jobs </span>available</p>
                <div className="flex gap-4 mt-6">                    
                    <div>
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 poiter-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500" placeholder="Search Jobs" required />
                            {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-400" fill="#d9d9d9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"/></svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Location" required />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-400" fill="#d9d9d9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M488 0H24C2.7 0-8 25.9 7.1 41L192 225.9V432c0 7.8 3.8 15.2 10.2 19.7l80 56C298 518.7 320 507.5 320 488V225.9l184.9-185C520 25.9 509.3 0 488 0z"/></svg>    
                        </div>
                        <input type="search" id="default-search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Type" required />
                    </div>
                </div>
            </section>

            <section className="p-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 h-fit-content text-left">
                    <div className="sm:col-span-5">
                        { rows }
                    </div>

                    {!toggleTab && !Object.keys(job).length &&
                    <div className="sm:col-span-7 ring-1 ring-gray-200 rounded-md p-4 min-h-[700px]">
                        <p className="text-sm text-gray-500">No Job Selected. Select a job to view more information</p>
                    </div>}
                        
                    {(!toggleTab && !!Object.keys(job).length) &&                     
                    <div className="sm:col-span-7 ring-1 ring-gray-200 rounded-md p-4 min-h-[700px]">
                        <div className="flex justify-between border-b pb-4 mb-4">                            
                            <div className="flex gap-4">
                                <div><img src={job.companyLogo} alt="" width="48px" height="48px" /></div>
                                <div>
                                    <p className="text-xl">{job.jobTitle}</p>
                                    <p className="text-gray-600 text-xs">{job.companyName} . {job.location}</p>
                                </div>
                            </div>
                            {!candidates.find(record => record.jobId === jobId) && <div><button onClick={() => {setToggleTab(true); clearForm()}} className="flex text-sm font-md px-4 py-2 text-white bg-blue-600 rounded-md">
                                <svg className="w-3 h-3 mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512"><path d="M173.9 439.4l-166.4-166.4c-10-10-10-26.2 0-36.2l36.2-36.2c10-10 26.2-10 36.2 0L192 312.7 432.1 72.6c10-10 26.2-10 36.2 0l36.2 36.2c10 10 10 26.2 0 36.2l-294.4 294.4c-10 10-26.2 10-36.2 0z"/></svg>
                                Apply</button></div>}

                            {candidates.find(record => record.jobId === jobId) && <div><button onClick={() => deleteCandidate(candidates.find(record => record.jobId === jobId)?._id)} className="flex text-sm font-md px-4 py-2 text-white bg-red-800 rounded-md">
                                <svg className="w-3 h-3 mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"><path d="M416 208H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32v-32c0-17.7-14.3-32-32-32z"/></svg>
                                Withdraw Application</button></div>}
                        </div>

                        <div className="my-4">
                            <p className="text-md font-semibold text-gray-800 mb-2">About the Company</p>
                            <HTMLContent html={job.aboutCompany} />
                        </div>

                        <div className="my-4">
                            <p className="text-md font-semibold text-gray-800 mb-2">Job Description</p>
                            <HTMLContent html={job.jobDescription} />
                        </div>
                    </div>}
                    

                    {toggleTab && <div className="sm:col-span-7 ring-1 ring-gray-200 rounded-md px-4 py-6 h-fit-content">
                        <div className="flex justify-between pb-4 border-b">
                            <p className="text-red-800 text-sm cursor-pointer" onClick={() => setToggleTab(false)}>Cancel</p>
                            <p className="text-lg font-semibold text-gray-800">Easy Apply <span class="material-symbols-rounded text-[18px] text-blue-600">verified</span></p>
                            {/* {candidates.find(record => record.jobId === jobId) && <p className="bg-green-100 text-green-600 px-4 py-[6px] rounded-md text-sm">Applied</p>} */}
                            <p></p>
                        </div>

                        <form className="px-10" onSubmit={SubmitApplication}>
                            <p className="text-gray-800 pt-4 text-lg font-medium">{job.jobTitle}</p>
                            <p className="text-gray-600 pt-1 pb-6 text-sm">Please ensure that all information provided is accurate and can be substantiated.</p>
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        id="firstName"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>                                    
                            </div>
                            <div className="mt-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>                                  
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Mobile Number <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="mobileNumber"
                                        id="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            >
                                            <option value="" disabled>Select...</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Nigeria">Nigeria</option>
                                        </select>
                                    </div>
                                </div>                                    
                            </div>

                            <div className="mt-6 col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Resume <span className="text-red-400">*</span>
                                </label>
                                <div className="mt-2">
                                    <ReactQuill
                                        value={formData.resume}
                                        onChange={handleQuill}
                                        required
                                        modules={{
                                            toolbar: [
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link', 'image'],
                                            [{ 'align': [] }],
                                            ],
                                        }}
                                        style={{height: '200px'}}
                                        className="mt-2"
                                        />
                                </div>
                                <p className="mt-12 text-sm leading-6 text-gray-600">Paste your resume.</p>
                            </div>

                            <button type="submit" 
                            className="w-full mt-6 py-3 bg-blue-600 text-sm text-white font-semibold rounded-md disabled:bg-gray-400 disabled:text-white"
                            // button is disabled while api is loading
                            disabled={isLoading}>Submit Application</button>

                        </form>
                    </div>}
                </div>
                
            </section>
            <ToastContainer />
        </div>
    )
}

export default FindJob