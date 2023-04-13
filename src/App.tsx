import './App.css'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import axios from 'axios'

type UserType = {
  name: string
  email: string
  street: string
  suite: string
  city: string
  zipcode: string
}

function App() {

  const fetchUserInfo = async () => {
    const response = await axios('https://jsonplaceholder.typicode.com/users/1')
    console.log(response.status)
    const data = await response.data
    return  {
      name: data.name,
      email: data.email,
      street: data.address.street,
      suite: data.address.suite,
      city: data.address.city,
      zipcode: data.address.zipcode
    }
  }

  const form = useForm<UserType>({
    defaultValues: () => {
      return fetchUserInfo()
    }
  })

  const { register, control, handleSubmit, formState: { errors } } = form
  
  const onSubmit = (data: UserType) => {
    console.log(data)
  }

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1>React Hook Form Demo</h1>
          <h3>User information</h3>

          {/* Name start */}
          <div className="form-group">
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input type="text" {...register('name', {
                required: "Name is required"
              })} />
            </div>
            <div className="error">{errors.name?.message}</div>
          </div>
          {/* Name end */}
          

          {/* Email start */}
          <div className="form-group">
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="text" {...register('email', {
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format"
                },
                required: "Email is required"
              })} />
            </div>
            <div className="error">{errors.email?.message}</div>
          </div>
          {/* Email end */}
          
          <h3>Address</h3>
          <div className="form-control">
            <label htmlFor="street">Street</label>
            <input type="text" {...register('street')} />
          </div>
          <div className="form-control">
            <label htmlFor="suite">Suite</label>
            <input type="text" {...register('suite')} />
          </div>
          <div className="form-control">
            <label htmlFor="city">City</label>
            <input type="text" {...register('city')} />
          </div>
          <div className="form-control">
            <label htmlFor="zipcode">Zipcode</label>
            <input type="text" {...register('zipcode')} />
          </div>
          <button className="btn submit" type="submit">Submit</button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  )
}

export default App
