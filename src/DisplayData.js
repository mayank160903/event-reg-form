// src/DisplayData.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayData = () => {
  const history = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  useEffect(() => {
    if(!formData){
        history('/');
    }
    else{
        console.log('Form details mounted with data' , formData);
    }
  })

  if (!formData) {
    history('/');
    return null;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-7 mb-10 border rounded-lg">
      <h1 className="text-2xl mb-4">Form Details</h1>
      <div className="mb-4">
        <strong>Full Name:</strong> {formData.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {formData.email}
      </div>
      <div className="mb-4">
        <strong>Age:</strong> {formData.age}
      </div>
      <div className="mb-4">
        <strong>Attending with Guest:</strong> {formData.attendingWithGuest}
      </div>
      {formData.attendingWithGuest === 'Yes' && (
        <div className="mb-4">
          <strong>Guest Name:</strong> {formData.guestName}
        </div>
      )}
      <button onClick={() => history('/')} className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg">
        Back to Form
      </button>
    </div>
  );
};

export default DisplayData;
