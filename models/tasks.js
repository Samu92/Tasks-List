require('colors');
const Task = require('./task');

/**
*  _list:
*  { 'uuid-123123112-13213123-2: {id: 1, description: asd, completedOnDate: 201700000}'}
*  { 'uuid-123123112-13213123-5: {id: 2, description: asd, completedOnDate: 201700000}'}
*  { 'uuid-12312352112-13353251-7: {id: 3, description: asd, completedOnDate: 201700000}'}
*/

class Tasks {
    _list = {};

    get listArray() {
        const list = [];

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    createTask(description = '') {
        const task = new Task(description);

        this._list[task.id] = task;
    }

    deleteTask(id = '')
    {
        if(this._list[id])
        {
            delete this._list[id];
        }
    }

    listAllTasks() {
        console.log();
        this.listArray.forEach((task, index) => {
            index = `${index + 1}`.green;
            const { description, completedOnTheDate} = task;
            const status = completedOnTheDate ? 
                'Completed'.green :
                'Pending'.red;
            
            console.log(`${index}. ${description} :: ${status}`);
        });
    }

    listTasks(showCompletedTasks = true) {
        console.log();
        let tasks = this.listArray.filter(task => showCompletedTasks ? task.completedOnTheDate : !task.completedOnTheDate);
    
        tasks.forEach((task, index) => {
            index = `${index + 1}`.green;
            console.log(`${index}. ${task.description} :: ${showCompletedTasks ? task.completedOnTheDate.green : 'Pending'.red}`);      
        });
    }

    completeTasks(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completedOnTheDate) {
                task.completedOnTheDate = new Date().toISOString();
            }
        });

        this.listArray.forEach(task => {
            if (!ids.includes(task.id))
            {
                this._list[task.id].completedOnTheDate = null;
            }
        });
    }
}

module.exports = Tasks;