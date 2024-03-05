import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import CreatePoll from './CreatePoll';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/createpoll' element={<CreatePoll/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
