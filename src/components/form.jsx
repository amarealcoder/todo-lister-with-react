import React, { Component } from 'react';
import List from './List';

class Form extends Component {
  constructor() {
    super();
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      task: '',
      duration: '',
      todos: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      task: this.state.task,
      duration: this.state.duration,
    };

    this.setState({
      todos: [...this.state.todos, todo],
      task: '',
      duration: '',
    });
  };

  handleDelete = (item, index) => {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos });
  };

  handleCheck=()=>{
    console.log('check')
  }

  renderCount() {
    const todos = [...this.state.todos];
    const todosCount = todos.length;
    if (todosCount === 0)
      return <h3 className='todo-count'>There are no tasks to do</h3>;
    if (todosCount === 1)
      return <h3 className='todo-count'>There is 1 task to do</h3>;
    if (todosCount > 1)
      return (
        <h3 className='todo-count'>There are {todosCount} tasks to do</h3>
      );
  }

  render() {
    const todos = [...this.state.todos];

    return (
      <div>
        <div className='main-header'>
          <h1>Todo List</h1>
        </div>
        <div id='todo-header'>
          <h2>Make your day stress free by using a todo list</h2>
        </div>
        {this.renderCount()}
        <form id='main-form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='task'>
              <b>Task </b>
            </label>
            <input
              value={this.state.task}
              onChange={this.handleChange}
              type='text'
              className='form-input'
              id='task'
              name='task'
              placeholder='Input your task'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='duration'>
              <b>Duration of task</b>
            </label>
            <input
              value={this.state.duration}
              onChange={this.handleChange}
              type='text'
              className='form-input'
              id='duration'
              name='duration'
              placeholder='Set your duration'
              required
            />
          </div>

          <input type='submit' value='Submit' className='btn' />
        </form>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Task</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='task-list'>
            {todos.map((item) => (
              <tr key={Math.random()}>
                <List todo={item} onClick={() => this.handleDelete(item)} onCheck={() => this.handleCheck(item)}/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Form;
