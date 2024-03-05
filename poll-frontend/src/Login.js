import React,{useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom'
import axios  from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [networkCall, setNetworkCall] = useState(false);
  const [user, setUser] = useState({
    userName:'',
    userPassword:'',
  });
  const handleChange = (e)=>{
    setUser(user=>({...user, [e.target.name]:e.target.value}))
  }
  const invalid = (user)=>{
    const isValidUsername = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{2,18}[a-zA-Z0-9])?$/.test(user.userName);
    const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/.test(user.userPassword);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.userName);

  if (!isValidUsername && !isValidEmail) {
      // Display error message for invalid username
      toast.error('invalid username or email!');
      return true;
  } else if (!isValidPassword) {
      // Display error message for invalid password
      toast.error('invalid password!');
      return true;
  }
  return false;

  }
  const handleLogin = async(e)=>{
    setNetworkCall(true)
    e.preventDefault();
    if(invalid(user))
    {
      setNetworkCall(false)
      return;
    }
    await axios.post('http://localhost:8080/api/user/login', user)
    .then(res =>res.data)
    .then(data=>{
      console.log('data', data);
      setUser({
        userName:'',
        userPassword:'',
      })
      navigate('/');
    })
    .catch(err => {
      console.log('error', err);
      setNetworkCall(false)
    })
  }
  return (
    <MDBContainer className="my-5 ">
      <ToastContainer/>
      <MDBCard className=''>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://media.istockphoto.com/id/1531141530/vector/exit-polling-icon-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=pxgaIH18e1nSFvhOv9TnCuJ5ZD_vYTK7SMu30UkSswI=' alt="login form" className='rounded-start'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="poll fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Poll app</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Username or Email' id='formControlLg' type='text' size="lg" name='userName' value={user.userName} onChange={handleChange}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" name='userPassword' value={user.userPassword} onChange={handleChange}/>

              <MDBBtn className="mb-4 px-5" color='dark' disabled={networkCall} size='lg' onClick={handleLogin}>Login</MDBBtn>
              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to='/register' style={{color: '#393f81'}}>Register here</Link></p>

        

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;