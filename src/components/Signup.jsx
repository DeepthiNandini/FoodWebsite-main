import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../assets/person.png';
import Email from '../assets/email.png';
import Password from '../assets/password.png';

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setmobile] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name){ newErrors.name = '*Name is required';
    }
    else if (/\d/.test(name))
        {
            newErrors.name='*Enter Valid name';
        }
    if (!email) {
      newErrors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '*Email is invalid';
    }
    if (!password) {
      newErrors.password = '*Password is required';
    } else if (password.length < 6) {
      newErrors.password = '*Password must be at least 6 characters';
    }
    if (!mobile) {
      newErrors.mobile = '*mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = '*mobile number must be 10 digits';
    }else if (/[a-zA-Z]/.test(mobile)) {
        newErrors.mobile = '*mobile number should not contain letters';
      }
    return newErrors;
  };



  // const handlelogin=async ()=>{
  //   const formErrors = validate();
  //   if (Object.keys(formErrors).length === 0) {
  //     try{
  //       console.log("hello");
  //    const response = await fetch("http://localhost:5000/api/user/login",
  //     { 
  //       method:'POST',
  //       headers:{
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({email,password})
  //    });



  const handleSignup = async () => {
    const formErrors = validate();
    console.log("helo");
    if (Object.keys(formErrors).length === 0) {
      try{
        const response = await fetch("http://localhost:5000/api/user/createUser",
          {
            method:"POST",
            headers:{
              'Content-Type': "application/json"
            },
            body: JSON.stringify({name,email,mobile,password})
          }
        )
        //console.log(response);

      const data = await response.json();
      console.log(data);

      if(data.message == "User created successfully"){
        setIsAuthenticated(true);
        navigate('/login');
      }
      else{
        setErrors({general:data.message || "Sign Up Failed"})
      }
      }
      catch(error)
      {
        setErrors({general: "An error Occured. Please try again later"})
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="loginbody">
      <div className='logincontainer'>
        <div className="loginheader">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="logininputs">
          <div className="logininput">
            <img src={User} alt="User Icon" />
            <input
              type="text"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            {errors.name && <div className="error">{errors.name}
          </div>}
          <div className="logininput">
            <img src={Email} alt="Email Icon" />
            <input
              type="email"
              placeholder='Email Id'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             </div>
            {errors.email && <div className="error">{errors.email}
          </div>}
          <div className="logininput">
            <img src={Password} alt="Password Icon" />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            {errors.password && <div className="error">{errors.password}
          </div>}
          <div className="logininput">
            <img src={Email} alt="mobile Icon" />
            <input
              type="tel"
              placeholder='mobile Number'
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />
             </div>
            {errors.mobile && <div className="error">{errors.mobile}
          </div>}
        </div>
        <div className="submit-container">
          <div className="forgetpassword">Already a User?<span onClick={()=>{navigate('/login')}}>Login!</span></div>
          </div>

        <div className="submit" onClick={handleSignup}>Sign Up</div>
      </div>
    </div>
  );
};

export default Signup;
