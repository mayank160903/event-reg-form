import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Content from './Content';

const Form = () => {

    const [formData , setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'No',
        guestName: '',
    })

    const [errors, setErrors] = useState({});
    const [lastGuestName, setLastGuestName] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name , value } = event.target;
        setFormData({
            ...formData,
            [name] : value,
        })
    }

    useEffect(() => {
        console.log('Form Data changed' , formData);
    }, [formData])

    const validate = () =>{
        let errors = {};

        if(!formData.name) errors.name = 'Name is required'
        if(!formData.email) errors.email = 'Email is required'
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.age) errors.age = 'Age is required';
        if (formData.age <= 0) errors.age = 'Age must be greater than 0';
        if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
            errors.guestName = 'Guest name is required if attending with a guest';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validate()){
            if (formData.attendingWithGuest === 'Yes') {
                setLastGuestName(formData.guestName); // Store guest name if attending with guest
              } else {
                setLastGuestName(''); // Reset guest name if not attending with guest
              }
              navigate('/details',{state: {formData}});
        }
    }

  return (
    <>
    <Content />
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-4 border rounded-lg mb-10">
      <div className="mb-4">
        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Are you attending with a guest?</label>
        <select
          name="attendingWithGuest"
          value={formData.attendingWithGuest}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {formData.attendingWithGuest === 'Yes' && (
        <div className="mb-4">
          <label className="block mb-2">Guest Name</label>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.guestName && <p className="text-red-500">{lastGuestName}</p>}
        </div>
      )}

      <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
    </form>
    </>
  )
}

export default Form

