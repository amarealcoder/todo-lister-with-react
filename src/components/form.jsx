import React, { Component } from 'react';
import Input from './input';

class Form extends Component {

  constructor(){
    super();
    this.state = {
      user: { task: '', duration: '' },
      items: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.id] = input.value;
    this.setState({ user });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let items = [...this.state.items];

    items.push({
      task: this.state.user.task,
      duration: this.state.user.duration,
    });
    this.setState({ items });

    // console.log('submitted', items);
  };
  render() {
    const user = this.state;
    const items = [...this.state.items];
    console.log(items, typeof items);
    return (
      <div>
        <div className='main-header'>
          <h1>Todo Lister</h1>
        </div>
        <div id='todo-header'>
          <h2>Make your day stress free by using a todo list</h2>
        </div>
        <form id='main-form' onSubmit={this.handleSubmit}>
          <Input
            value={user.task}
            onChange={this.handleChange}
            label='Task'
            id='task'
          />
          <Input
            value={user.duration}
            onChange={this.handleChange}
            label='Duration of task'
            id='duration'
          />

          <input type='submit' value='Submit' className='btn' />
        </form>
        <table className='table'>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='task-list'>
            {items.map((item) => {
              <tr key={Math.random()}>
                <td>{item.task}</td>
                <td>{item.duration}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Form;
