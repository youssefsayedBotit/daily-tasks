import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Daily Tasks Report</h1>
            <UserForm />
            <UserList />
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default App;
