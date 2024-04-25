import axios from 'axios'
const BASE_URL = process.env.REACT_APP_SERVER_URL
const ACCESS_TOKEN = process.env.REACT_APP_JWT_TOKEN

const makeGetRequest = (request) =>  {
    const request_urls =  {
        "getUsers": "/document/findAll/users",
        "getJobs": "/document/findAll/jobs",
        "getJobById": "/document/findOne/jobs/" + request.id,
        "getCandidates": "/document/findAll/candidates",
        "getCandidateById": "/document/findOne/candidates/" + request.id,
    }

    if (request.params !== undefined) {
        var obj = request.params
        var params = Object.keys(obj).map((key) =>  {return key + '=' + obj[key] }).join('&')
        var request_url = BASE_URL + request_urls[request.what] + "?" + params
    }else {
        request_url = BASE_URL + request_urls[request.what] 
        // request_url = "https://smooth-comfort-405104.uc.r.appspot.com" + "/document/findAll/users"
    }
    
    return new Promise((resolve, reject) =>  {
        axios.get(request_url,  {
            headers: {
                'Authorization': ACCESS_TOKEN, 
                'Content-Type':'application/json'
            }
        })
        .then((response) =>  {
            var res =  {
                msg: "Action Successful", 
                status: response.status, 
                data: response.data.data
            }
            resolve(res)
        })
        .catch((err) =>  {
            console.log(err)
            reject(err)
        })
    })
}

const makePostRequest = (request) =>  {

    const request_urls =  {
        "createUser": "/document/createorupdate/users",
        "postJob": "/document/createorupdate/jobs",
        "submitApplication": "/document/createorupdate/candidates"
    }

    if (request.params !== undefined) {
        var obj = request.params
        var params = Object.keys(obj).map((key) =>  {return key + '=' + obj[key] }).join('&')
        var request_url = BASE_URL + request_urls[request.what] + "?" + params
    }else {
        request_url = BASE_URL + request_urls[request.what]
    }

    var data = (request.data !== undefined)?request.data: {}
    var config; 
    // if (request_url !== BASE_URL + '') {// do not set if it is pointing to 'authenticate'
        
    // }
    config =  {
        headers: {
            'Authorization': ACCESS_TOKEN,
            'Content-Type':'application/json'
        },
        // withCredentials: true, 
    }
    return new Promise((resolve, reject) =>  {
        axios.post(request_url, data, config)
            .then((response) =>  {
                var res; 
                res =  {
                    msg: response.message, 
                    status: response.status, 
                    // data: response.data
                }
                resolve(res)
            })
            .catch((err) =>  {
                console.log(err)
            })
    })
}

const makePatchRequest = (request) =>  {

    const request_urls =  {
        
    }

    if (request.params !== undefined) {
        var obj = request.params
        var params = Object.keys(obj).map((key) =>  {return key + '=' + obj[key] }).join('&')
        var request_url = BASE_URL + request_urls[request.what] + "?" + params
    }else {
        request_url = BASE_URL + request_urls[request.what]
    }

    var data = (request.data !== undefined)?request.data: {}
    var config =  {
        headers: {
            'Authorization': ACCESS_TOKEN
        },
        withCredentials: true, 
    }

    //console.log('%cSending patch request to: ' + request_url, 'color:#00ff00;font-size:14px;background:#000;')
    return new Promise((resolve, reject) =>  {
        axios.patch(request_url, data, config)
            .then((response) =>  {
                var res; 
                res =  {
                    msg:"Action Successful", 
                    type:request.what, 
                    status:true, 
                    data:response.data
                }
                resolve(res)
            })
            .catch((err) =>  {
                console.log(err)
            })
    })
}

const makePutRequest = (request) =>  {

    const request_urls =  {
        "editJob": "/document/updateOne/jobs/"+ request.id,
        "editpassword": "/document/updateOne/users/"+ request.id
    }

    if (request.params !== undefined) {
        var obj = request.params
        var params = Object.keys(obj).map((key) =>  {return key + '=' + obj[key] }).join('&')
        var request_url = BASE_URL + request_urls[request.what] + "?" + params
    }else {
        request_url = BASE_URL + request_urls[request.what]
    }

    var data = (request.data !== undefined)?request.data: {}
    var config =  {
        headers: {
            'Authorization': ACCESS_TOKEN
        },
    }

    return new Promise((resolve, reject) =>  {
        axios.put(request_url, data, config)
            .then((response) =>  {
                var res; 
                res =  {
                    msg:"Action Successful", 
                    type:request.what, 
                    status:true, 
                    data:response.data
                }
                resolve(res)
            })
            .catch((err) =>  {
                console.log(err)
            })
    })
}

const makeDeleteRequest = (request) =>  {

    const request_urls =  {
        "deleteJob": "/document/deleteOne/jobs/"+ request.id,
        "deleteCandidate": "/document/deleteOne/candidates/"+ request.id
    }

    if (request.params !== undefined) {
        var obj = request.params
        var params = Object.keys(obj).map((key) =>  {return key + '=' + obj[key] }).join('&')
        var request_url = BASE_URL + request_urls[request.what] + "?" + params
    }else {
        request_url = BASE_URL + request_urls[request.what]
    }

    var data = (request.data !== undefined)?request.data: {}
    var config =  {
        headers: {
            'Authorization': ACCESS_TOKEN
        },
    }

    return new Promise((resolve, reject) =>  {
        axios.delete(request_url, config, data)
            .then((response) =>  {
                var res; 
                res =  {
                    msg: response.message, 
                    status: response.status, 
                }
                resolve(res)
            })
            .catch((err) =>  {
                console.log(err)
            })
    })
}

export {makeGetRequest, makePostRequest, makePutRequest, makePatchRequest, 
    makeDeleteRequest, BASE_URL, ACCESS_TOKEN }