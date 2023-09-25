import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) =>{
    e.prevenDefault()
  }
    return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
            type="email"
            className="form-control" 
            id='name' 
            email='email' 
            value={email} 
            placeholder='Enter your email'
            onChanged={onChange}/>
          </div>
          <div className="form-group">
            <input
            type="password"
            className="form-control" 
            id='password' 
            name='password' 
            value={password} 
            placeholder='Enter your password'
            onChanged={onChange}/>
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              submit
            </button>
          </div>
        </form>
      </section>

    </>
  )
}

export default Login