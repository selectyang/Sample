import React, {Component} from 'react';
import TodoItem from '../todoitem';
import TodoFooter from '../footer';

import './index.css'

export default class TodoList extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        
        let {list, deleteTask,statusTask} = this.props;//
        let comps = list.map((item) => {
            return <TodoItem 
                item = {item} 
                deleteTask = {deleteTask}
                statusTask = {statusTask}
                key={item.id} />;
        });

        let totalCount = list.length;
        let doneCount = list.filter((item) => {return item.status}).length;

        
        return (
            <div className="list-container">
                <div className="title">
                    React TodoList
                </div>
                <div className="list">
                    {comps}
                </div>
                <div className="footer">
                    <TodoFooter doneCount = {doneCount} totalCount = {totalCount} /> 
                </div>
            </div>
        ) 
    }
}