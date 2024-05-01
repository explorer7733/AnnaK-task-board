// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

/***************************** 
 *Add a function to retrieve tasks from localStorage:
 
 function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}


 * Call this function to get tasks when the page loads and display them on the Task Board:
 
 window.addEventListener('load', () => {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        // Create task card dynamically and append it to the Task Board
    });
});
 
 
Update your code to save tasks to localStorage when a new task is added:

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 * **************************************/ 


// Todo: create a function to generate a unique task id
    function generateTaskId() {
    return 'task_' + (nextId++);
    }

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card w-75 task-card draggable my-3')
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

    const toDoList = $('#todo-cards');
    toDoList.empty();

    const inProgressList = $('#in-progress-cards')
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of taskList) {
        if (task.status === 'to-do') {
            toDoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task))
        }
    }
    
    //To make cards draggable - use jQuery UI Interaction Draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable')
            return original.clone().css({
                width: original.outerWidth(),
            })   
        },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const taskTitle = $('#task-title-input').val().trim();
    const taskDate = $('#task-due-date-input').val();
    const taskDescription = $('#task-description-input').val();

    const newTask = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDate,
        description: taskDescription,
        status: 'to-do',
    };
    console.log(newTask);
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    //Clear the form inputs
    $('#task-title-input').val('');
    $('#task-due-date-input').val('');
    $('#task-description-input').val('');

    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    
    const taskId = $(this).attr('data-task-id');
    
    taskList = taskList.filter(task => task.id !== taskId);

    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    
    const taskId = ui.draggable[0].dataset.taskId;
    
    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    //render the task list
    renderTaskList();

    //add event listeners
    $('#task-form').on('submit', handleAddTask);
    $('.modal-footer').on('click', '.btn-danger', handleDeleteTask);

    //make lines droppable FIX THIS 
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    });

    //due date input - date picker
    $('#task-due-date-input').datepicker({
        altFormat: "DD/MM/YYYY"
    });

});


