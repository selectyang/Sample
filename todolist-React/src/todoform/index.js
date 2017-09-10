import React, {Component} from 'react';

import './index.css';

export default class TodoForm extends Component{
    constructor(props) {
        super(props);
    }

    submitTask = (e) => {

        let {saveTask} = this.props;
        let value = this.input.value;
        if (value) {
            saveTask(value);
            this.input.value = '';
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className="form-container">
                <form className="form">
                    <div className="ipt-container">
                        <span>Task:</span>
                        <input type="text" 
                            placeholder="输入任务" 
                            ref = {(input) => {this.input = input;}}
                         />
                    </div>
                    <div className="btn-container" onClick = {this.submitTask}>
                        <button>saveTask</button>
                    </div>
                </form>
            </div>
        );
    }
}