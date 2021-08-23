import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import { styled } from '@material-ui/core/styles';
import { Button, Grid, Paper, TextField, makeStyles, InputLabel} from '@material-ui/core';

const ENDPOINT = "http://ec2-34-242-65-242.eu-west-1.compute.amazonaws.com:5000";


const useStyles = makeStyles((theme) => ({
  input: {
    color: "#FFF",
  },
}));


function App() {
  
  var socket = socketIOClient(ENDPOINT);
  socket.on("message", (data) => {

    data = JSON.parse(data.replace(/'/g, '"'))
    console.log(data)
    if(data.state === 'room-non-existent'){
      alert('Room not found!')
    }else if (data.state === 'joined-room'){
      alert('Connected to Room: ' + data.room)
    }

  })


  const classes = useStyles();

  const [code, setCode] = useState('');


  function firstButton() {
    console.log('First Button Message')
    socket.emit("messages", { room: code, message: '0' } ); 
  
  }

  function secondButton() {
    console.log('Second Button Message')
    socket.emit("messages", { room: code, message: '1' } ); 
  }

  function thirdButton() {
    console.log('Third Button Message')
    socket.emit("messages", { room: code, message: '2' } ); 
  }

  function fourthButton() {
    console.log('Fourth Button Message')
    socket.emit("messages", { room: code, message: '3' } ); 
  }

  function sendButton() {
    console.log('Send Button Message')
    
    socket.emit("join", { room: code } ); 
    // socket.emit('join', {room: ""})
    alert('conectando ...', code.toString())

  }
  

  return (
    <div className="App">
      <header className="App-header">
     
      <Grid  container direction="row" spacing={1} >

        <Grid item xs={12}>
          <h2>SocialStation.it</h2>
        </Grid>

        <Grid item xs={12}>
         <TextField variant="outlined" value={code} onChange={e => setCode(e.target.value)} inputProps={{ className: classes.input }} placeholder='Code' ></TextField>
          <Button onClick={sendButton} variant="outlined" color="primary" style={{width: "60px", height: "55px", color: "green", borderColor: "green"}}>Send</Button>
        </Grid>

        <Grid item xs={6}>
          <Button onClick={firstButton} variant="outlined" color="primary" style={{width: "150px", height: "150px", color: "blue", borderColor: "blue"}}>
            Primary
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button onClick={secondButton} variant="outlined" color="primary" style={{width: "150px", height: "150px", color: "orange", borderColor: "orange"}}>
            Second
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button onClick={thirdButton} variant="outlined" color="primary" style={{width: "150px", height: "150px", color: "magenta", borderColor: "magenta"}}>
            Third
          </Button>
        </Grid>
        
        <Grid item xs={6}>
          <Button onClick={fourthButton} variant="outlined" style={{width: "150px", height: "150px", color: "red", borderColor: "red"}}>
            Fourth
          </Button>
        </Grid>

{/* states */}

        <Grid item xs={3} container direction="column" justify="center" alignItems="center">
          <InputLabel style={{width: "40px", height: "40px", color: "blue", borderColor: "blue", backgroundColor: "blue"}}>
          </InputLabel>
        </Grid>

        <Grid item xs={3} container direction="column" justify="center" alignItems="center">
          <InputLabel style={{width: "40px", height: "40px", color: "orange", borderColor: "orange", backgroundColor: "orange"}}>
          </InputLabel>
        </Grid>

        <Grid item xs={3} container direction="column" justify="center" alignItems="center">
          <InputLabel style={{width: "40px", height: "40px", color: "magenta", borderColor: "magenta", backgroundColor: "magenta"}}>
          </InputLabel>
        </Grid>

        <Grid item xs={3} container direction="column" justify="center" alignItems="center">
          <InputLabel style={{width: "40px", height: "40px", color: "red", borderColor: "red", backgroundColor: "red"}}>
          </InputLabel>
        </Grid> 

      </Grid>
       

      </header>



    </div>
  );
}

export default App;
