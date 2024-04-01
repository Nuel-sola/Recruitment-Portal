import './App.css';
import { Routes, BrowserRouter, Route} from 'react-router-dom';
import PostJob from './pages/Admin/PostJob';
import Login from './pages/Authentication/Login';
import JobHistory from './pages/Admin/JobHistory';
import FindJob from './pages/FindJob';
import { Provider } from 'react-redux';
import store from './store';
import CreateUser from './pages/Authentication/CreateUser';
import JobCandidate from './pages/Admin/JobCandidate';
import EditJob from './pages/Admin/EditJob';
import CandidateResume from './pages/Admin/CandidateResume';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/post-job" element={<PostJob />}/>
            <Route path="/job-history" element={<JobHistory />}/>
            <Route path="/find-job" element={<FindJob />}/>
            <Route path="/create-user" element={<CreateUser />}/>
            <Route path="/candidates/:title" element={<JobCandidate />}/>
            <Route path="/candidates/:title/:id/resume" element={<CandidateResume />}/>
            <Route path="/edit-job/:id" element={<EditJob />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
    
  );
}

export default App;
