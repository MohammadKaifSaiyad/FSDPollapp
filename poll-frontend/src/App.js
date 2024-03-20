import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePoll from "./components/CreatePoll";
import { useEffect, useState } from "react";
import { MDBListGroup, MDBListGroupItem, MDBTypography, MDBBtn} from 'mdb-react-ui-kit';
import axios from "axios";
import Poll from "./components/Poll";
import Context from "./Context";

function App() {
  const [pollList, setPollList] = useState(null);
  const navigate = useNavigate()
  const fetchAllActivePolls = () => {
    axios
      .get("http://localhost:8080/api/poll")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setPollList(data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };
  useEffect(() => {
    fetchAllActivePolls();
  }, []);
  return (
    <Context.Provider value={{pollList:[pollList,setPollList]}}>
        <Routes>
          <Route
            path="/"
            element={
              !pollList
                ? 
                  <div className="d-flex">
                    <MDBTypography tag='div' className='display-5 pb-3 ps-3 mb-3 border-bottom w-75'>NO Poll is Active</MDBTypography>
                    <MDBBtn className='h-50 m-4' color='dark' onClick={()=>{navigate("/createpoll")}}>CreatePoll</MDBBtn>
                  </div>
                :<> 
                  <div className="d-flex">
                    <MDBTypography tag='div' className='display-5 pb-3 ps-3 mb-3 border-bottom w-75'>All Active Polls</MDBTypography>
                    <MDBBtn className='h-50 m-4' color='dark' onClick={()=>{navigate("/createpoll")}}>CreatePoll</MDBBtn>
                  </div>
                  <MDBListGroup className=" d-flex align-items-center justify-content-center" style={{ minWidthL: '22rem' }} light>{pollList.map((poll) => <Poll poll={poll} />) }</MDBListGroup>
                </>
            }
          />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/createpoll" element={<CreatePoll />}></Route>
        </Routes>
    </Context.Provider>
  );
}

export default App;
