import React from 'react';

export default function How() {
  return (
    <div style={{color:"white", padding:"30px"}}>
      <h2><u>HOW TO PLAY</u></h2><br/>
      Guess the <b>WORDLE</b> in 6 tries.
    <br/><br/>
Each guess must be a valid 5 letter word. Hit the enter button to submit.
<br/><br/>
After each guess, the color of the tiles will change to show how close your guess was to the word.
<hr/>
<b>Examples</b><br/>
<img src="1.png" width="250px"/><br/>
The letter W is in the word and in the correct spot.<br/><br/>
<img src="2.png" width="255px"/><br/>
The letter I is in the word but in the wrong spot.<br/><br/>
<img src="3.png" width="250px"/><br/>
The letter U is not in the word in any spot.<br/><br/><hr/>
This is Unlimited WORDLE. You can go to any round you want at any day! ;)
    </div>
  );
}
