import React from 'react';
const List = ({ todo, onClick, onCheck }) => {
  return (
    <>
      <td>
        <input type='checkbox' className='type' onCheck={onCheck} />
      </td>
      <td>{todo.task}</td>
      <td>{todo.duration}</td>
      <td>
        <button onClick={onClick} className='btn'>
          Delete
        </button>
      </td>
    </>
  );
};

export default List;
