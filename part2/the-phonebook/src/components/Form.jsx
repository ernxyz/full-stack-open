import React from 'react'

const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <br /> <input value={props.newName} onChange={props.handleNewName}/> <br />
        phone number: <br /> <input value={props.newNumber} onChange={props.handleNewNumber}/>
      </div>
      <div>
        <br /><button type="submit">add</button>
      </div>
    </form>
  );
}

export default Form;