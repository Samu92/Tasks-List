require('colors');
const {inquirerMenu, pause, readInput, listTasksToDelete, listTasksToComplete, confirm} = require('./helpers/inquirer');
const {saveToDb, readDb} = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

console.clear();

const main = async() => 
{
    let option = '';
    const tasks = new Tasks();
    
    const tasksDB = readDb();

    if(tasksDB)
    {
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:
                const description = await readInput('Description:');
                tasks.createTask(description);
                break;
            case 2:
                tasks.listAllTasks();
                break;
            case 3:
                tasks.listTasks(true);
                break;
            case 4:
                tasks.listTasks(false);
                break;
            case 5:
                const ids = await listTasksToComplete(tasks.listArray);
                tasks.completeTasks(ids);
                break;
            case 6:
                const id = await listTasksToDelete(tasks.listArray);
                if(id !== 0)
                {
                    const deleteTask = await confirm('Are you sure?')
                    if(deleteTask){
                        tasks.deleteTask(id);
                        console.log('The task has been successfully deleted');
                    }
                }
                break;
            default:
                break;
        }

        saveToDb(tasks.listArray);

        await pause();
    } while(option !== 0);
}

main();