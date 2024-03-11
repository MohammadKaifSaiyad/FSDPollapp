import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import CreatePoll from './CreatePoll';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pollList, setPollList] = useState(null);
  const fetchAllActivePolls = ()=>{
    axios.get('http://localhost:8080/api/poll')
    .then(res=>res.data)
    .then(data=>{
      console.log(data);
      setPollList(data);
    })
  }
  useEffect(()=>{
    fetchAllActivePolls();
  },[])
  return (
    <>
    {!pollList?"NO Poll is Active":pollList.map(poll=><Poll poll={poll}/>)}
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/createpoll' element={<CreatePoll/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
