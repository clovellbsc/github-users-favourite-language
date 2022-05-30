import React from "react";

const Form = ({ handleChange, username, handleSubmit }) => {
  return (
    <form>
      <input
        type="text"
        onChange={handleChange}
        value={username}
        placeholder="Username"
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default Form;
