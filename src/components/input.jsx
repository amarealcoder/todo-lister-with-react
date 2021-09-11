import React, { Component } from 'react';
 const Input = ({ value, onChange, label, id }) => {
     return (
       <div className='form-group'>
         <label htmlFor={id}>
           <b>{label} </b>
         </label>
         <input
           value={value}
           onChange={onChange}
           type='text'
           className='form-input'
           id={id}
           placeholder='Input your task'
         />
       </div>
     );
 }
  
 export default Input;