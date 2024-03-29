import React, { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
    const [regname, setregname] = useState('');
    const [regemail, setregemail] = useState('');
    const [regpass, setregpass] = useState('');

    const onRegister = async () => {
        if (regname.trim() === '' || regemail.trim() === '' || regpass.trim() === '') {
            return console.log('Please fill in all fields');
            // Exit the function if any field is empty
        }       
        
        try {
            const response = await fetch('https://myfaceappbe.onrender.com/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: regname,
                    email: regemail,
                    password: regpass,
                })
            });

            // if (!response.ok) {
            //     throw new Error('Registration failed. Please try again.');
            // }

            const user = await response.json();
            if (user === 'User already exists') {
                throw new Error(user);
            } else {
                loadUser(user);
                onRouteChange('home');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onNameChange = (event) => {
        setregname(event.target.value)
    }

    const onEmailChange = (event) => {
        setregemail(event.target.value)
    }

    const onPassChange = (event) => {
        setregpass(event.target.value)
    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Registration</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="regname"
                                onChange={onNameChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={onPassChange} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="button"
                            value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('signin')} href="#0" className="f6 link dim black db pointer">Sign In</p>
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;
