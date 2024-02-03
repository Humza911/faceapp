import React from "react";

const Navigation = ({onRouteChange, signIn, initialState}) => 
{
    if(signIn)
    {
        return(
            <nav style={{display: 'flex', justifyContent:'flex-end', padding:30}}>
            <button onClick={()=>{onRouteChange('signin');initialState();}} className="f6 link dim br2 ph3 pv2 mb2 dib white bg-light-purple bn">Sign Out</button>
            </nav>
        )
    }
    else{
        return(
            <nav style={{display: 'flex', justifyContent:'flex-end', padding:30}}>
            <p onClick={()=>onRouteChange('signin')} className="f6 link dim br2 ph3 pv2 mb2 dib white pointer bn">Sign In</p>
            <p onClick={()=>onRouteChange('register')} className="f6 link dim br2 ph3 pv2 mb2 dib white pointer bn">Register</p>
            </nav>
        )
    }        
}

export default Navigation;