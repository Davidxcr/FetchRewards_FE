import { useState } from 'react';
import './App.css';
import FormInput from './components/FormInput';


const App = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    occupation: "",
    state: ""
  })
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Full Name",
      errorMessage: "Full Name should be more than 3 characters and shouldn't include any special characters",
      label: "Full Name",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "E-mail",
      errorMessage: "It should be a valid email address",
      label: "E-mail",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "",
      label: "Password",
    },
    {
      id: 4,
      name: "occupation",
      type: "text",
      placeholder: " Occupation",
      errorMessage: "",
      label: "Occupation",
    },
    {
      id: 5,
      name: "state",
      type: "text",
      placeholder: "State",
      errorMessage: "",
      label: "State",
    }]
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  console.log(values)

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
      <button>Submit</button>
      errorMessage:"",</form>

  </div>
}

export default App;
