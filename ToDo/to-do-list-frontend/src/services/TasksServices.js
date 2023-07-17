import React, { Component } from 'react';
import axios  from 'axios';

const TASKS_API_BASE_URL = "http://localhost:8080/api/v1/tasks";

class TasksServices{
    getTasks(){
        return axios.get(TASKS_API_BASE_URL);
    }
}

export default new TasksServices()