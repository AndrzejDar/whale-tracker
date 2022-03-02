import { connect } from 'react-redux'
import React from 'react'

const WalletStats=({addres})=> {
    console.log(addres);
  return (
    <div></div>
  )
}

const mapStateToProps=(state)=>({
    adress: state.wallet.wallet.token,

})


export default connect(mapStateToProps)(WalletStats)