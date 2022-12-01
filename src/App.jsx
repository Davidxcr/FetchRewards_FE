import { useState, useEffect } from 'react';
import './App.css';
import './components/formInput.css'
import FormInput from './components/FormInput';
import swal from 'sweetalert'

const App = () => {
  const [extData, setExtData] = useState({})
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [occupation, setOccupation] = useState(" ")
  const [state, setState] = useState(" ")
  const [focused, setFocused] = useState(false);


  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then(res => res.json())
      .then(data => setExtData(data))
  }, [])

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Full Name",
      errorMessage: "Full Name should be more than 3 characters and shouldn't include any special characters",
      label: "Full Name",
      pattern: `^[A-Za-z0-9]{3,50}$`,
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "E-mail",
      errorMessage: "It should be a valid email address",
      label: "E-mail",
      required: true
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters with minimum 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true
    }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();

    if (occupation === 'Select Occupation' || state === 'Select State') {
      alert('Choose a proper occupation and / or state');
    } else {
      const formInfo = { ...values, occupation, state }
      console.log(formInfo)
      fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInfo)
      })
        .then((response) => {
          console.log(response.json())
        })
        .catch(err => {
          console.log(err)
        })
      setValues('');
      setOccupation("")
      setState("")
      e.target.reset()
      swal('Thank you for registering...')
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleFocus = (e) => {
    setFocused(true);
  };
  return <div className='app'>
    <form onSubmit={handleSubmit}>
      <h1>User Registration</h1>
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
      <div className='formInput' required>
        <label>Select Occupation</label>
        <select
          defaultValue={'Select Occupation'}
          required
          onChange={(e) => {
            const occupationSelect = e.target.value;
            setOccupation(occupationSelect)
          }}
          onBlur={handleFocus} focused={focused.toString()}
        >
          <option className='option' value="" selected disabled>Select Occupation</option>
          {
            extData.occupations ? extData.occupations.map((occ, key) =>
              <option key={key} value={occ}>{occ}</option>
            ) : null
          }
        </select>
        <span>Please Select an Occupation</span>
      </div>
      <div className='formInput'>
        <label >Select State</label>
        <select
          defaultValue={'Select State'}
          required
          onChange={(e) => {
            const stateSelect = e.target.value;
            setState(stateSelect)
          }}
          onBlur={handleFocus} focused={focused.toString()}
        >
          <option
            value=""
            disabled
            selected
          >Select State</option>
          {
            extData.states ? extData.states.map((st, key) =>
              <option key={key} value={st.name}>
                {st.abbreviation}
              </option>
            ) : null
          }
        </select>
        <span>Please Select a State</span>
      </div>
      <button>Submit</button>
    </form >

  </div >
}

export default App;
