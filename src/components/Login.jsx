import Email from '../assets/email.png';
import Password from '../assets/password.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '*Email is invalid';
    }
    if (!password) {
      newErrors.password = '*Password is required';
    } else if (password.length < 8) {
      newErrors.password = '*Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handlelogin=async ()=>{
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try{
     const response = await fetch('',
      {method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
     });
     const data = await response.json();

     if(data.success)
      {
        setIsAuthenticated(true);
        navigate('/meals');
      }
      else{
        setErrors({general: data.message || 'Login failed'});
      }
    }
    catch(error)
    {
      setErrors({general: "An error Occured. Please try again later"});
    }
  }
     else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="loginbody">
      <div className='logincontainer'>
        <div className="loginheader">
          <div className="text">LogIn</div>
          <div className="underline"></div>
        </div>
        <div className="logininputs">
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

        </div>

        <div className="submit-container">
          <div className="forgetpassword">Forgot Password? <span onClick={()=>{navigate('/forgotpassword')}}>Click here!</span></div>
          <div className="forgetpassword"><span onClick={()=>{navigate('/Signup')}}>Sign Up</span></div>
          </div>

          <div className= "submit" onClick={handlelogin}>Login</div>
          
        </div>
      </div>
   
  );
};

export default Login;
