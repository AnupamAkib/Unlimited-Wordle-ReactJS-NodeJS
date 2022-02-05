import * as React from 'react';
import { useState, useRef } from 'react';

export default function SimpleSnackbar(props) {
  let Open = props.open;
  let Msg = props.msg;
  //console.log(Open)
  const close = () =>{
    Open = false;
    document.getElementById('snackbar').style.display='none';
  }
  if(Open){
    const myTimeout = setTimeout(close, 2000);
    Open = false;
    return (
        <div style={{zIndex:"100"}} className='snackbar' id='snackbar'  onClick={close}>
      <center><div className='msgbox'>{Msg}<div style={{float:"right"}} onClick={close}><i className="fa fa-close" style={{fontSize:"20px", color:"gray"}}></i></div></div></center>
    </div>
    ); 
  }
  else{
    return (
    <></>
    );
  }
  
}