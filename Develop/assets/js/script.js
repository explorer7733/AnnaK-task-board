// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return 'task-' + Date.now(); //need to check!!!!
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>')
        .addClass('card-header h3')
        .text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDueDate = $('<div>')
        .addClass('card-text')
        .text(task.DueDate);
    const cardDescription = $('<div>')
        .addClass('card-text')
        .text(task.description);
    
    //Create delete button
    const cardDeleteButton = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    
    cardDeleteButton.on('click', handleDeleteTask);
   
    //Create function to check the status of task and style the background color per provided criteria
    if (task.DueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteButton.addClass('border-light');
        }
    }

    //Append all created elements to the cardBody and taskCard
    cardBody.append(cardDueDate, cardDescription, cardDeleteButton);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
