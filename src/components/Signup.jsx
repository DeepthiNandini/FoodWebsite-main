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
  const [phone, setPhone] = useState('');

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
    if (!phone) {
      newErrors.phone = '*Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = '*Phone number must be 10 digits';
    }else if (/[a-zA-Z]/.test(phone)) {
        newErrors.phone = '*Phone number should not contain letters';
      }
    return newErrors;
  };

  const handleSignup = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setIsAuthenticated(true);
      navigate('/login');
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
            <img src={Email} alt="Phone Icon" />
            <input
              type="tel"
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
             </div>
            {errors.phone && <div className="error">{errors.phone}
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
