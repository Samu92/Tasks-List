const { v4: uuidv4 } = require('uuid');

class Task{
    id = '';
    description = '';
    completedOnTheDate = null;

    constructor(description) {
        this.id = uuidv4();
        this.description = description;
        this.completedOnTheDate = null;
    }
}

module.exports = Task;