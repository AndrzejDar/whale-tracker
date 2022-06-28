import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'reactstrap'
import { getWallet } from '../actions/walletActions'
import { formatAddress } from '../utils/formatUtils'
import {Link, Redirect} from 'react-router-dom'

function addressLink({address,getWallet}) {
  return (
    <div onClick={()=>getWallet(address)}><Link to="/">{formatAddress(address)}</Link></div>
    // <a href="/"><div onClick={()=>getWallet(address)}>{formatAddress(address)}</div></a>
  )
}

const mapDispatchToProps=(dispatch)=>({
getWallet: (addres)=>dispatch(getWallet(addres))
})

export default connect(null,mapDispatchToProps)(addressLink)