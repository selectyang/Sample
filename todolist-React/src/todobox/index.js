import React, {Component} from 'react';
import TodoList from '../todolist';
import TodoForm from '../todoform';

import './index.css'

export default class TodoBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                id: 1,
                status: 1,
                text: 'React'
            }, {
                id: 2,
                status: 0,
                text: 'React1'
            }, {
                id: 3,
                status: 0,
                text: 'React2'
            }]
        }
    }
    
    componentWillMount() {
        
    }

    statusTask = (item) => {
        //修改数组元素
        let index = this.state.list.findIndex((item1) => {
            return  item1.id === item.id
        })
        let list = [...this.state.list]
        list[index].status = !list[index].status
        this.setState({
            list: list
        });
    }

    saveTask = (text) => {
        this.setState({
            list: this.state.list.concat({
                id: this.generateId(),
                text: text,
                status: 0
            })
        });
    }

    deleteTask = (item) => {
        // 数组删除元素
        let index = this.state.list.findIndex((item1) => {
            return item1.id === item.id;
        });
        let list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list: list
        });
    }

    // 给新增的任务一个随机的id
    generateId = ()=> {
        return Math.floor(Math.random() * 9000) + 1000;
    }

    render() {
        let {list} = this.state;
        return (
            <div className="todobox">
                <TodoList list = {list} deleteTask = {this.deleteTask} statusTask = {this.statusTask}/>
                <TodoForm saveTask = {this.saveTask}/>
            </div>
        )
    }
}



