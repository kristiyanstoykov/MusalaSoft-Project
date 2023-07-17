import Navigationbar from "../components/NavigationBar";
import React, { useEffect, useState } from 'react';
import ListTasksComponent from "../components/ListTasksComponent";

function Home(){
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
    
        fetch('api/tasks')
            .then(response => response.json())
            .then(data => {
            setTasks(data);
            setLoading(false);
          })
      }, []);
    

    //Disable if not connected to API
    //if (loading) { return <p>Loading...</p>;}

    return(
        <div>
        <Navigationbar/>
        <div className="App">
            <header className="App-header">
                <div className="App-intro">
                    <h2>Task List</h2>
                    <ListTasksComponent/>
        </div>
        
      </header>
    </div>
        </div>

    )


}
export default Home;
