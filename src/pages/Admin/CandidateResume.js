import { useSelector } from "react-redux"
import Layout from "./Layout"
import { useNavigate, useParams } from "react-router-dom";
import { makeGetRequest } from "../../request";
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import HTMLContent from "../HTMLContent";


const CandidateResume = () => {
    const navigate = useNavigate()
    const param = useParams()
    
    const pageContext = useSelector(state => state.pageContext.value);

    const [candidate, setCandidate] = useState({})    
    const getCandidateById = () => {
        var request = {
            what: "getCandidateById",
            id: param.id
        };
        
        makeGetRequest(request)
          .then((response) => {  
              setCandidate(response.data)
          })
          .catch((error) => {
              toast.error("An error occured!")
          });
    }

    useEffect(() => {
        getCandidateById()
    }, [])

    const title = "Job History"
    return (
        <Layout title={title}>
            <div class="main">
                <section className="shadow-lg">
                    <div className="flex justify-between p-4 border-b">
                        <p className="text-blue-600 text-sm cursor-pointer" onClick={() => navigate(-1)}>Back</p>
                        <p className="text-sm font-semibold text-gray-800">{ pageContext.title } - <span className="">{ pageContext.code }</span></p>
                        <p></p>
                    </div>
                    <HTMLContent style={{css: "text-left px-8 py-4 overscroll-y-auto"}} html={candidate.resume} />
                    
                </section>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default CandidateResume