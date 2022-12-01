import { useState, useEffect } from 'react';
import './App.css';
import './components/formInput.css'
import FormInput from './components/FormInput';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
  toast("Custom Style Notification with css class!", {
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: 'dark'
  });
}
const App = () => {
  const [extData, setExtData] = useState({})
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [occupation, setOccupation] = useState("")
  const [state, setState] = useState("")

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
      errorMessage: "Password should be minimum 8 characters",
      label: "Password",
      required: true
    }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    if (occupation === 'Select Occupation' || state === 'Select State') {
      alert('Choose a proper occupation and / or state');
    }
    const formInfo = { ...values, occupation, state }
    // console.log(formInfo)
    fetch('https://frontend-take-home.fetchrewards.com/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formInfo)
    })
      .then((response) => {
        console.log(response.json())
        console.log("Here we go1")
        notify()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

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
