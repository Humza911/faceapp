import React from "react";

const Facerecognition = ({imageUrl}) => 
{
    return(
        <div className="imageResolution">
            {imageUrl && <img src={imageUrl} alt="Face Recognition"/>} 
        </div>  
        
    )
}

export default Facerecognition;