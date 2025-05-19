import React, {useState} from 'react';
import './App.css';
import {TodoTable} from './components/TodoTable';
import {NewTodoForm} from './components/NewTodoForm';

export const App = () => {

  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  const [todos, setTodos] = useState([
    {rowNumber: 1, rowDescription: 'Walk Gus', rowAssigned: 'Lucy'}
  ]
  )

  const addTodo = (description: string, assigned: string) => {
    let rowNumber:number = 0;
    if (todos.length > 0){
      rowNumber = todos[todos.length-1].rowNumber + 1;
    } else {
      rowNumber = 1;
    }
    const newTodo = {
      rowNumber: rowNumber,
      rowDescription: description, 
      rowAssigned: assigned
    };
    setTodos(todos => [...todos, newTodo])
            // the ... allows for a new array to be created by combining existing array
            // allows for settodos to be called on each element in tbe todos array 
            // useState takes in the current state and a function that updates the state
  }

  const deleteTodo = (deleteTodoRowNumber:number) => {
    let filtered = todos.filter(function (value) {
      return value.rowNumber !== deleteTodoRowNumber;
      //add every todo except the one w the ID of the one that was clicked to delete it
    });

    setTodos(filtered);
  }

  return (
    <div className='mt-5 container'>
      <div className='card'>
        <div className='card-header'>
          Your Todos
        </div>
        <div className='card-body'>
          <TodoTable todos={todos} deleteTodo={deleteTodo}/>
          <button className='btn btn-primary' onClick = {() => setShowAddTodoForm(!showAddTodoForm)}>
          {showAddTodoForm ? 'Close New Todo' : 'New Todo'}
          </button>
        {showAddTodoForm &&
          <NewTodoForm addTodo={addTodo}/>
        }
        </div>
      </div>
    </div>
  );
}

