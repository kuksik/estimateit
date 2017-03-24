import React from 'react';
import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';
import moment from 'moment';
import styles from './style.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 2,
          maximumHours: 3,
          minimumHours:2,
          taskName: 'test1',
          tasks: [
            {
              id: 3,
              maximumHours: 3,
              minimumHours:2,
              taskName: 'test2',
              tasks: [
                {
                  id: 4,
                  maximumHours: 3,
                  minimumHours:2,
                  taskName: 'test3',

                },
                {
                  id: 5,
                  maximumHours: 3,
                  minimumHours:2,
                  taskName: 'test2',
                }
              ]
            }
          ],
        }
      ],
      parentTaskId: '',
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.setParentId = this.setParentId.bind(this);
    this.preAddTask = this.preAddTask.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.date !== this.state.date) {
      this.datefield.setValue(nextState.date);
    }
  }

  onDateChange(dateString, { dateMoment, timestamp }) {
    this.setState({ date: dateString }, () => {
      history.replaceState({}, "", "/?" + JSON.stringify(this.state));
    });
  }

  componentDidMount() {
    const loc = decodeURIComponent(location.href);
    const state = JSON.parse(loc.split('?').pop());
    console.log(state, 'stataaaate');
    this.setState(Object.assign({}, state), () => {
      console.log(this.state);
    });
  }

  onEditTask(e) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const taskToEdit = this.state.tasks.filter(t => t.id == id)[0];
    taskToEdit[name] = value;
    const tasks = this.state.tasks.filter(t => t.id != id);
    tasks.push(taskToEdit);
    this.setState({ tasks }, () => {
      history.replaceState({}, "", "/?" + JSON.stringify(this.state));
    });
  }

  setParentId(e) {
    const id = e.currentTarget.dataset.id;
    this.setState({ parentTaskId: id })
  }

  renderTasks(tasks, iterator) {

    return tasks.map((task, i) =>
      <div key={task.id} style={{marginLeft: `${iterator*10}px` }}>
        <input data-id={task.id} style={{marginRight: '20px'}} name='taskName' value={task.taskName}  onChange={this.onEditTask}/>
        <input data-id={task.id} type="number" value={task.minimumHours} name='minimumHours' onChange={this.onEditTask}/>
        <input data-id={task.id} type="number" value={task.maximumHours} name='maximumHours' onChange={this.onEditTask}/>
        <button data-id={task.id} onClick={this.setParentId} >Add subtask</button>
        <button data-id={task.id} onClick={this.deleteTask}>Delete</button>
        {this.state.parentTaskId == task.id && i < 3? this.renderAddTaskForm(this.state.parentTaskId) : ''}
        {task.tasks && this.renderTasks(task.tasks, i + 1)}
      </div>
    )
  }

  preAddTask(e) {
    const newTask = this.state.newTask || {};
    newTask[e.currentTarget.name] = e.currentTarget.value;
    newTask.parentTaskId = e.currentTarget.dataset.parentId || null;
    this.setState({
      newTask,
    }, () => {
      console.log(this.state);
    })
  }

  renderAddTaskForm(parentTaskId) {
    return (
      <div className='header--addTaskForm'>
        <input
          data-parentId={parentTaskId}
          type='text'
          placeholder='task'
          name='taskName'
          onChange={this.preAddTask}
        />
        <input
          data-parentId={parentTaskId}
          type='number'
          placeholder='minimum hours'
          name='minimumHours'
          onChange={this.preAddTask}
        />
        <input
          data-parentId={parentTaskId}
          type='number'
          placeholder='maximum hours'
          name='maximumHours'
          onChange={this.preAddTask}
        />
      <button onClick={this.addTask}>Add task</button>
      </div>
    )
  }

  deleteTask(e) {
    const id = e.currentTarget.dataset.id;
    this.setState({ tasks: this.state.tasks.filter(t => t.id != id) }, () => {
      history.replaceState({}, "", "/?" + JSON.stringify(this.state));
    });
  }

  addTask(e) {
    const newTask = this.state.newTask;
    newTask.id = new Date().getTime();
    // if(parentTaskId) {
    //   const taskToEdit = this.state.tasks.filter(t => t.id == this.state.parentTaskId)[0];
    //   taskToEdit.subtasks.push(newTask);
    //   const tasks = this.state.tasks.filter(t => t.id != this.state.parentTaskId);
    //   tasks.push(taskToEdit);
    //   this.setState({ tasks }, () => {
    //     history.replaceState({}, "", "/?" + JSON.stringify(this.state));
    //   });
    //
    // } else {
    this.setState({ tasks: [...this.state.tasks, newTask], parentTaskId: '', newTask: null} , () => {
      history.replaceState({}, "", "/?" + JSON.stringify(this.state));
    });
    // }
    e.currentTarget.parentElement.childNodes.forEach(i => i.nodeName =='INPUT' ? i.value = '' : '')
  }

  render () {
    const tasks = this.state.tasks.sort((a, b) => a.id > b.id);
    return (
      <div>
        <div className={styles.left__part}>
          <img
            src={require('../pictures/logo.png')}
            height={50}
            width={50}
          />
          <span className={styles.company__name}>
            Keenethics </span>
          <div className={styles.header__contacts}>
            <span>3, Lytvynenka street, Lviv</span>
            <span>Keenethics Phone: [+38 096 814 72 66]</span>
            <span>e-mail: <a href="mailto:founders@keenethics.com">founders@keenethics.com</a></span>
            <span><a href="https://keenethics.com/">keenethics.com</a></span>
          </div>
        </div>
        <div className={styles.right__part}>
          <div className={styles.emphasize}>ESTIMATE</div>
          <span>
            <label htmlFor="datePicker">Enter the date:</label>
            <DateField
              htmlFor='datePicker'
              dateFormat='YYYY-MM-DD'
              ref={(dateField) => { this.datefield = dateField; }}
              onChange={this.onDateChange}
            />
          </span>
          <span>
            <label htmlFor="clientName">Client name:</label>
            <input
              ref={(clientName) => { this.clientName = clientName; }}
              type='text'
              id="clientName"
            />
          </span>
          <span>
            <label htmlFor="projectName">Project name:</label>
            <input
              ref={(projectName) => { this.projectName = projectName; }}
              type='text'
              id="projectName"
            />
          </span>
          <span>
            <label htmlFor="sprintNumber">Sprint #</label>
            <input
              type='number'
              id="sprintNumber"
              ref={(sprintNumber) => { this.sprintNumber = sprintNumber; }}
            />
          </span>
        </div>
          <div className={styles.clearfix}></div>
          <textarea placeholder="Technologies, libraries, APIs" /><br />
          <div className='tasks'>{this.renderTasks(tasks, 0)}</div>
          <br/>
          {this.renderAddTaskForm()}
          <textarea placeholder="Comments" /><br />
      </div>
    )
  }
}
