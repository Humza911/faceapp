import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = () => 
{
    return(
        <div>
            <p className="white f4">
            {'This Magic Brain detects faces in pictures'}
            </p>
            <div className=" whitebox flex items-center">               
                <input className="f4 pa2 w-80 mr2 shadow-1 bn" type="text"/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple br2 bn">Detect</button>       
            </div>
        </div>
    )
}

export default ImageLinkForm;