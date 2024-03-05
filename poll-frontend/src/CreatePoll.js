import React, { useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
    MDBTextArea,
  }
  from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePoll() {
  const [defaultChoices, setDefaultChoices] = useState(['','','']);
  const [choices, setChoices] = useState([]);

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  }

  const handleRemoveChoice = (index) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  }

  const handleInputChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  }

  const handleCreatePoll = (e) => {
    e.preventDefault();
    let check =0;
    console.log(defaultChoices, choices);
    defaultChoices.map(i=>{
      if(i===''){
        // toast.warning('fill empty filed');
        check=1;
      }
      return i;
    })
    choices.map(i=>{
      if(i===''){
        // toast.warning('fill empty filed');
        check=1;
      }
      return i;
    })
    if(check===1){
      toast.warning('fill empty filed');
      return;
    }
    //
    const formData = new FormData();
    formData.append('pollQuestion', defaultChoices[0]);
    formData.append('choice1', defaultChoices[1])
    formData.append('choice2', defaultChoices[2])
    choices.map((value, index)=>{
      formData.append(`optionalChoice${index}`, value);
      return value;
    })
    // call endpoint
  }
  const handleChangeDefault =(index, value)=>{
    const newDefault = [...defaultChoices];
    newDefault[index]=value;
    setDefaultChoices(newDefault);

  }
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 mx-10">
      <ToastContainer />
      <MDBTextArea wrapperClass='mb-4 ' label='Poll question' id='form1' type='text' value={defaultChoices[0]} onChange={(e)=>{handleChangeDefault(0,e.target.value)}}/>
      <MDBInput
            wrapperClass='mb-4'
            label='choice 1'
            id='form2-1'
            type='text'
            value={defaultChoices[1]}
            onChange={(e)=>{handleChangeDefault(1,e.target.value)}}
          />
          <MDBInput
            wrapperClass='mb-4'
            label='choice 2'
            id='form2-2'
            type='text'
            value={defaultChoices[2]}
            onChange={(e)=>{handleChangeDefault(2,e.target.value)}}
          />
      {choices.map((choice, index) => (
        <div key={index} className="d-flex align-items-center">
          <MDBInput
            wrapperClass='mb-4'
            label={`choice ${index + 3}`}
            id={`form2-${index}`}
            type='text'
            value={choice}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <MDBBtn
            className="mb-4 ml-2 px-5"
            color='dark'
            size='sm'
            onClick={() => handleRemoveChoice(index)}
          >
            Remove
          </MDBBtn>
        </div>
      ))}

      <div className='w-3/6'>
      <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleAddChoice}>Add choice</MDBBtn>
      </div>
      <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleCreatePoll}>Create Poll</MDBBtn>
    </MDBContainer>
  );
}

export default CreatePoll;
