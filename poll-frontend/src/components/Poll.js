import React, { useContext, useEffect, useState } from "react";
import "./Poll.css";
import { Link } from "react-router-dom";
import Context from "../Context";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRadio
} from 'mdb-react-ui-kit';
import axios from "axios";
// const { Group } = radio;

const Poll = ({ poll }) => {
  const [optionSelected, setOptionSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const context = useContext(Context);
  const [pollList, setPollList]= context.pollList;
  const handleVote = (e)=>{
    setOptionSelected(true);
    console.log('poll question',e.target.name);
    console.log('option',e.target.id)
    setSelectedOption(e.target.id);
    const requestBody = {
      pollId:poll.id,
      pollOptionId:e.target.id,
    }
    axios.put('http://localhost:8080/api/poll/cratePoll',requestBody)
    .then(res=>res.data)
    .then(data=>{
      if(data[0]!=null){
        setPollList(data);
      }
    })
    .catch(err=>{
      console.log('error:',err);
    })
  }
  const calculateVote = (option)=>{
    if(selectedOption==option.id){
      return (option.totalVotes+1)/(poll.totalVotes+1) *100;
    }
    return option.totalVotes/(poll.totalVotes+1) *100;
  }
  useEffect(() => {
    console.log("poll: ", poll);
  }, []);

  return (
    <MDBCard className="w-25 my-3">
      <MDBCardBody>
        <MDBCardTitle>{poll.pollQuestion}</MDBCardTitle>
        <div className="poll-choices">
          {!optionSelected?
          poll.pollOptions.map((option)=>(
              <MDBRadio className="my-1" name={poll.id} id={option.id} label={option.option} onClick={handleVote} disabled={optionSelected}/>
            )):
            poll.pollOptions.map((option)=>(<>{option.option} :<div className={`shadow-1-strong rounded-pill ${selectedOption ==option.id?"bg-success":"bg-secondary"} mx-1 my-1 text-center`}>{calculateVote(option)} %</div></>))
          }
        </div>
        <div>Total Votes: {poll.totalVotes}</div>
      </MDBCardBody>
    </MDBCard>);
};

export default Poll;
