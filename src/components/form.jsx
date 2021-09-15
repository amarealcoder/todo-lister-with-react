import React, { Component } from 'react';
import List from './List';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      duration: '',
      todos: [],
      id: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let todos = localStorage.getItem('todos');

    if (todos) {
      todos = JSON.parse(todos);
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
    }
    if (todos?.length) {
      this.setState({
        todos: [...todos],
      });
    }
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

    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    this.setState({
      todos: [...this.state.todos, todo],
      task: '',
      duration: '',
    });
  };

  handleDelete = (todo) => {
    const todos = [...this.state.todos];
    todos.splice(todo, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState({ todos });
  };

  renderCount() {
    const todos = [...this.state.todos];
    const todosCount = todos.length;
    if (todosCount === 0)
      return <h3 className='todo-count'>There are no tasks to do</h3>;
    if (todosCount === 1)
      return <h3 className='todo-count'>There is 1 task to do</h3>;
    if (todosCount > 1)
      return <h3 className='todo-count'>There are {todosCount} tasks to do</h3>;
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
            {todos.map((todo, index) => (
              <tr key={index}>
                <List todo={todo} onClick={() => this.handleDelete(todo)} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Form;
