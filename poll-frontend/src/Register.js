import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
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
import { Link } from 'react-router-dom';
function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    userFullName:'',
    userName:'',
    userEmail:'',
    userPassword:''
  });
  const handleChange = (e)=>{
    setUser(user=>({...user,[e.target.name]:e.target.value}))
  }
  const invalid = (user)=>{
    const isValidFullName = /^[a-zA-Z][a-zA-Z\s'-]{0,48}[a-zA-Z]$/.test(user.userFullName);
    const isValidUsername = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{2,18}[a-zA-Z0-9])?$/.test(user.userName);
    const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/.test(user.userPassword);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.userEmail);

    if (!isValidFullName) {
        // Display error message for invalid full name
        toast.error('invalid full name!');
        return true;
    } else if (!isValidUsername) {
        // Display error message for invalid username
        toast.error('invalid username!');
        return true;
    } else if (!isValidPassword) {
        // Display error message for invalid password
        toast.error('invalid password!');
        return true;
    } else if (!isValidEmail) {
        // Display error message for invalid email
        toast.error('invalid email!');
        return true;
    }
    return false;

  }
  const handleUserRegistration = async(e) => {
    e.preventDefault();
    console.log('user', user);
    if(invalid(user))
      return;
    await axios.post('http://localhost:8080/api/user', user)
      .then(res =>res.data)
      .then(data=>{
        console.log('data', data);
        navigate('/login');
      })
      .catch(err => {
        console.log('error', err);
      })
    setUser({
      userFullName:'',
      userName:'',
      userEmail:'',
      userPassword:''
    });
  }
    return (
        <MDBContainer className="my-5 ">
          <ToastContainer/>
          <MDBCard className=''>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>
    
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="poll fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">Poll app</span>
                  </div>

                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                  <MDBInput wrapperClass='mb-4' label='Fullname' name='userFullName' id='formControlLg' type='text' size="lg" value={user.userFullName} onChange={handleChange}/>
                  <MDBInput wrapperClass='mb-4' label='Username' name='userName' id='formControlLg' type='text' size="lg" value={user.userName} onChange={handleChange}/>
                  <MDBInput wrapperClass='mb-4' label='Email address' name='userEmail' id='formControlLg' type='email' size="lg" value={user.userEmail} onChange={handleChange}/>
                  <MDBInput wrapperClass='mb-4' label='Password' name='userPassword' id='formControlLg' type='password' size="lg" value={user.userPassword} onChange={handleChange} data-mdb-ripple-init data-mdb-tooltip-init data-mdb-placement="top" title="Allows letters, numbers, and special characters.
Must have at least one uppercase letter, one lowercase letter, one number, and one special character.
Minimum length of 8 characters.
Maximum length of 20 characters."/>
  
                  <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleUserRegistration}>Register</MDBBtn>
                  {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                  <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Do have an account? <Link to='/login' style={{color: '#393f81'}}>Login here</Link></p>
    
                </MDBCardBody>
              </MDBCol>
              <MDBCol md='6'>
                <MDBCardImage src='https://media.istockphoto.com/id/1531141530/vector/exit-polling-icon-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=pxgaIH18e1nSFvhOv9TnCuJ5ZD_vYTK7SMu30UkSswI=' alt="Register form" className='rounded-start'/>
              </MDBCol>
    
            </MDBRow>
          </MDBCard>
    
        </MDBContainer>
      );
    }

export default Register