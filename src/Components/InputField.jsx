import React from 'react';
// import "./Form.css"

const InputField = ({ placeHolder, type, name, value, onChange }) => {
  return (
    <div>
      <input
        className='input-field'
        placeholder={placeHolder}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;



