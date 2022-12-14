import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import Alert from 'react-bootstrap/Alert';
import '../../../scss/main.scss';

export default function LogInPage({ setLoggedIn, setAccount }) {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [showWrongLogin, setWrongLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = { email, passWord };
  };
  let navigate = useNavigate();

  async function login() {
    let getAccount = await (await fetch(`/api/users/${email}/${passWord}`))
      .json()
      .catch(setWrongLogin(true));
    if (getAccount === null) return setWrongLogin(true);
    else {
      setAccount(...getAccount);
      const obj = Object.assign({}, ...getAccount);
      if (!getAccount || !getAccount.length) {
        setWrongLogin(true);
      } else if (Object.keys(getAccount[0]).length >= 1) {
        setLoggedIn(true);
        navigate(`/`, { state: { showLoginText: true } });
      }
    }
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <div className='Heading'>
          <h1>Logga in</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Email</label>
            <input
              style={{ textAlign: 'start' }}
              type='email'
              className='form-control'
              aria-describedby='emailHelp'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Lösenord</label>
            <input
              style={{ textAlign: 'start' }}
              type='password'
              className='form-control'
              placeholder='Lösenord'
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
          </div>
          <div className='log-btn'>
            <button className='login-btn' onClick={login}>
              Logga in
            </button>
          </div>
          {showWrongLogin ? (
            ['danger'].map((variant, i) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '203px',
                  marginBottom: '-43px',
                  marginTop: '4px',
                }}
                key={i}
              >
                <Alert key={variant} variant={variant}>
                  Fel Lösenord/Email
                </Alert>
              </div>
            ))
          ) : (
            <></>
          )}
        </form>
        <div className='Register-heading'>
          <h3>Har du inget konto?</h3>
          <h5>Registrera dig här.</h5>
        </div>
        <div>
          <Button
            buttonStyle='btn--secondary-outline'
            buttonSize='btn--medium-secondary'
            link='/registrera'
          >
            Registrera
          </Button>
        </div>
      </div>
    </div>
  );
}
