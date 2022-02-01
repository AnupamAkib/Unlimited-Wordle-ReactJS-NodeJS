import * as React from 'react';
import { useState, useRef } from 'react';

export default function SimpleSnackbar(props) {
  let Open = props.open;
  let Msg = props.msg;
  //console.log(Open)
  const close = () =>{
      document.getElementById('snackbar').style.display='none';
      Open = false;
  }
  if(Open){
    const myTimeout = setTimeout(close, 2000);
    //setOpen(false);
    return (
        <div  className='snackbar' id='snackbar'>
      <center><div className='msgbox'>{Msg}</div></center>
    </div>
    );
  }
  else{
    return (
    <></>
    );
  }
  
}