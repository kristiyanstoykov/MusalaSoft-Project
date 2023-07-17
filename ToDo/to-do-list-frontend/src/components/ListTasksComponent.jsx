import React, { Component } from 'react';
import TasksServices from '../services/TasksServices';

class ListTasksComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            tasks:[]
        }
    }

    componentDidMount(){
        TasksServices.getTasks().then((res)=>{
            this.setState({tasks:res.data})
        });
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <table className='table'>
                        <thead>
                            <th>Task Title</th>
                            <th>Task Description</th>
                            <th>Actions</th>
                        </thead>

                        <tbody>
                            {
                                this.state.tasks.map(
                                    tasks=>
                                    <tr key={tasks.id}>
                                        <td>{tasks.title}</td>
                                        <td>{tasks.description}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListTasksComponent;