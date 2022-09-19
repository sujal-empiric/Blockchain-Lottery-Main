import React from 'react'
import './BuyButtons.css'
import approveTokenGIF from './static/Approve Token Button GIF.gif'
import approveTokenBLUE from './static/Approve Token Button BLUE.png'
import BuyTicketGIF from './static/Buy Ticket Button GIF.gif'
import BuyTicketPINK from './static/Buy Ticket Button PINK.png'
import BuyTicketBLUE from './static/Buy Ticket Button BLUE.png'
function BuyButtons(props) {
  var approve
  var buy
  if(props.status===0){
    approve = approveTokenGIF
    buy = BuyTicketPINK
  }else if(props.status===1){
    approve = approveTokenBLUE
    buy = BuyTicketGIF
  }else if(props.status===2){
    approve = approveTokenBLUE
    buy = BuyTicketBLUE
  }else{
    approve = approveTokenBLUE
    buy = BuyTicketBLUE
  }
  return (
    <div className='buttonContainer'>
        <img className='buttons' alt='NO IMG FOUND' onClick={props.approve} src={approve}></img>
        <img id='depositeBtn' className='buttons' alt='NO IMG FOUND' onClick={props.depositeUSDT} src={buy}></img>
    </div>
  )
}

export default BuyButtons