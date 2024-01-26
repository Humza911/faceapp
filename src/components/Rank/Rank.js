import React from "react";

const Rank = ({username, userrank}) => 
{
    return(
        <div>
            <div className="white f3">
            <p>{username} your current Rank is</p>
            </div>
            
            <div className="white f1">
            <p>{userrank}</p>
            </div>

        </div>
    )
}

export default Rank;