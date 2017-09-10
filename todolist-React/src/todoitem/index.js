import React, {Component} from 'react';

import './index.css';

export default class TodoItem extends Component{
    constructor(props) {
        super(props);
    }

    toggleTaskStatus = (e) => {
        let {item,statusTask} = this.props;
        statusTask(item)
    }

    delTask = () => {
        let {item, deleteTask} = this.props;
        deleteTask(item);
    }

    render() {
        let {item} = this.props; //this.props;
        let delLine = ''
        if(item.status){
            delLine =  'delLine'
        }
        return (
            <div className="item-container">
                <div className="item-inner" onClick={this.toggleTaskStatus}>
                    <span className="chk-container">
                        <input type="checkbox" 
                               className="chk"
                               checked = {item.status}
                               />
                        <span className={`text ${delLine}`}>{item.text}</span>
                    </span>
                </div>
                <div className="del-container" onClick={this.delTask}>
                    删除
                </div>
            </div>
        )   
    }

}