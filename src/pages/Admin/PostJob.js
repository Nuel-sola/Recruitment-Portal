// import { useRef, useState } from "react";
import { useState } from "react";
import Layout from "./Layout"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { makePostRequest } from "../../request";
import { toast, ToastContainer } from 'react-toastify';
import { removeHtmlTags, todaysDate } from "../../helpers";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        companyName: "",
        companyLogo: "",
        aboutCompany: "",
        jobTitle: "",
        jobCode: "",
        minSalary: "",
        maxSalary: "",
        jobType: "",
        location: "",
        jobDescription: "",
        closingDate: "",
        createdDate: todaysDate(),
    })

    const [isLoading, setIsLoading] = useState(false)
    const PostJob = (event) => {
        event.preventDefault()
        // console.log(formData)
        const isFormReady = !!removeHtmlTags(formData.aboutCompany) && !!removeHtmlTags(formData.jobDescription)

        if(Object.values(formData).every(value => value) && isFormReady) { // valid form fields
            var request = {
                what: "postJob",
                data: formData
            };
            setIsLoading(true)
            makePostRequest(request)
              .then((response) => {
                toast.success("Job Created Successfully!")   

                navigate("/job-history")
                setIsLoading(false)
              })
              .catch((error) => {
                  toast.error("An error occured!")
                  setIsLoading(false)
              });
        }
        else toast.warning("Kindly provide information for all required fields!")
        
    }   
    
    const handleQuill1 = (html) => setFormData({ ...formData, "aboutCompany" : html, });
    const handleQuill2 = (html) => setFormData({ ...formData, "jobDescription" : html, });

    const handleChange = (e) => {
        const {name, value} = e.target
    
        setFormData({...formData, [name]: value})
    }

    // const [selectedFile, setSelectedFile] = useState(null);
    // const fileInputRef = useRef(null);

    // const handleButtonClick = () => {
    //     fileInputRef.current.click();
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     // Update state with the selected file
    //     setSelectedFile(file);
    // };

    const title = "Post Job"
    return (
        <Layout title={title}>
            <div class="main">
                <section className="shadow-lg">
                    <form className="text-left" onSubmit={PostJob}>
                        <div className="space-y-12 lg:px-12 sm: px-6 py-6">
                            <div className="border-b border-gray-900/10 pb-10">
                                <h2 className="text-lg font-semibold leading-7 text-gray-900">Company Details</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Provide information about the company curating this post.
                                </p>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Company Name <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="companyLogo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Company Logo <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="companyLogo"
                                            value={formData.companyLogo}
                                            onChange={handleChange}
                                            required
                                            placeholder="https://xyz.com/logo.png"
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {/* <div className="mt-2 flex items-center gap-x-3">
                                            <span class="material-symbols-rounded text-[32px] text-gray-300">account_circle</span>
                                            <input
                                                type="file"
                                                name="company-logo"
                                                hidden
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleButtonClick}
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                {selectedFile ? "Change" : "Upload"}
                                            </button>
                                            <span className="text-xs">{selectedFile?.name}</span>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="mt-6 col-span-full">
                                    <label htmlFor="aboutCompany" className="block text-sm font-medium leading-6 text-gray-900">
                                        About the Company <span className="text-red-400">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <ReactQuill
                                            value={formData.aboutCompany}
                                            onChange={handleQuill1}
                                            modules={{
                                                toolbar: [
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                // ['link', 'image'],
                                                ['link'],
                                                [{ 'align': [] }],
                                                ],
                                            }}
                                            style={{height: '200px'}}
                                            required
                                            className="mt-2"
                                            />
                                    </div>
                                    <p className="mt-12 text-sm leading-6 text-gray-600">Give a brief summary for better insight.</p>
                                </div>
                            </div>

                            <div>                               
                                <h2 className="text-lg font-semibold leading-7 text-gray-900">Job Details</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Describe the role and responsibilities of the position.</p>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                            Job Title <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="jobTitle"
                                            id="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="jobCode" className="block text-sm font-medium leading-6 text-gray-900">
                                            Job Code <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="jobCode"
                                            id="jobCode"
                                            value={formData.jobCode}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>                                    
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="minSalary" className="block text-sm font-medium leading-6 text-gray-900">
                                            Minimum Salary (Yearly) <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="minSalary"
                                                id="minSalary"
                                                value={formData.minSalary}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="maxSalary" className="block text-sm font-medium leading-6 text-gray-900">
                                            Maximum Salary (Yearly) <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="maxSalary"
                                                id="maxSalary"
                                                value={formData.maxSalary}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="jobType" className="block text-sm font-medium leading-6 text-gray-900">
                                            Job Type <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                            id="jobType"
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            >
                                            <option value="" disabled>Select...</option>
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Contract">Contract</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                            Location <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            >
                                            <option value="" disabled>Select...</option>
                                            <option value="Ontario, CA">Ontario, Canada</option>
                                            <option value="Maryland, US">Maryland, United States</option>
                                            <option value="Birmingham, UK">Birmingham, United Kingdom</option>
                                            <option value="Lagos, NG">Lagos, Nigeria</option>
                                            </select>
                                        </div>
                                    </div>                                    
                                </div>

                                <div className="mt-6 col-span-full">
                                    <label htmlFor="jobDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                        Job Description <span className="text-red-400">*</span>
                                    </label>
                                    <ReactQuill
                                        value={formData.jobDescription}
                                        onChange={handleQuill2}
                                        modules={{
                                            toolbar: [
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link'],
                                            [{ 'align': [] }],
                                            ],
                                        }}
                                        style={{height: '200px'}}
                                        className="mt-2"
                                        required
                                        />
                                    
                                    <p className="mt-12 text-sm leading-6 text-gray-600">Give enough information about the job.</p>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                        <label htmlFor="closingDate" className="block text-sm font-medium leading-6 text-gray-900">
                                            Closing Date <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                name="closingDate"
                                                id="closingDate"
                                                value={formData.closingDate}
                                                onChange={handleChange}
                                                required
                                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                />
                                        </div>
                                    </div>                                 
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 bg-blue-600 text-sm text-white font-semibold rounded-md disabled:bg-gray-400 disabled:text-white" disabled={isLoading}>Post Job</button>
                            
                        </div>
                    </form>
                </section>                
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default PostJob