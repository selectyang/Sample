import React, {Component} from 'react';

import './index.css'

export default class Footer extends Component{
    render() {
        let {doneCount, totalCount} = this.props;
        return (
            <div className="footer">
                {doneCount} 个已完成 / 共{totalCount}个
            </div>
        );
    }
}