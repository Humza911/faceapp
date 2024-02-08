import React, { useState } from "react";

const Signin = ({onRouteChange, loadUser}) => 
{
    const [signinemail, setemail] = useState('');
    const [signinpass, setpass] = useState('');
    
    const onSignin = async () =>
    {
        if (signinemail.trim() === '' || signinpass.trim() === '') {
            return console.log('Please fill in all fields');
            // Exit the function if any field is empty
        }
        const response = await fetch('http://localhost:3000/signin',{
            method: 'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email: signinemail,
                password: signinpass,
            })
        })
        const data = await response.json();    
        if (data.Id)
            {
                loadUser(data);
                onRouteChange('home');                
            }
            else{
                onRouteChange('signin');

            }
    }

    const onEmailChange = (event) =>
    {
        setemail(event.target.value)
    }
    const onPassChange = (event) =>
    {
        setpass(event.target.value)
    }

    return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"
                    onChange={onEmailChange}/>                    
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    onChange={onPassChange}/>                    
                </div>
                </fieldset>
                <div className="">
                <input 
                    onClick={onSignin} 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"/>
                    </div>
                <div className="lh-copy mt3">
                <p onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                </div>
            </div>
            </main>
        </article>
    )
}



export default Signin;