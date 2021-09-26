"use strict";
//Referencias elementos del DOM
var buttonAddTask = document.querySelector('#add-task');
var inputTask = document.querySelector('#new-task');
var incompleteTasksList = document.querySelector('#incomplete-tasks');
var completedTasksList = document.querySelector('#completed-tasks');
//Clase que representa una tarea 
var TodoTask = /** @class */ (function () {
    function TodoTask(task, isCompleted) {
        this.task = task;
        this.isCompleted = isCompleted;
    }
    ;
    return TodoTask;
}());
//Administador de las tareas
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    //Método para agregar una tarea
    TaskManager.prototype.addTask = function (task) {
        var newTask = new TodoTask(task, false);
        this.tasks.push(newTask);
    };
    return TaskManager;
}());
var HTMLhelper = /** @class */ (function () {
    function HTMLhelper() {
    }
    HTMLhelper.createTaskItem = function (task) {
        var li = document.createElement('li');
        var input = document.createElement('input');
        input.addEventListener('change', function () {
            input.checked ? task.isCompleted = true : null;
            printTaskHTML();
        });
        var label = document.createElement('label');
        input.type = 'checkbox';
        label.innerText = task.task;
        li.appendChild(input);
        li.appendChild(label);
        return li;
    };
    HTMLhelper.cleanInput = function () {
        inputTask.value = '';
    };
    return HTMLhelper;
}());
var taskManager = new TaskManager();
//EventListeners
buttonAddTask.addEventListener('click', function () {
    // console.log(inputTask.value)
    taskManager.addTask(inputTask.value);
    printTaskHTML();
    HTMLhelper.cleanInput();
});
var printTaskHTML = function () {
    completedTasksList.innerHTML = '';
    incompleteTasksList.innerHTML = '';
    taskManager.tasks.forEach(function (task) {
        task.isCompleted ? completedTasksList.appendChild(HTMLhelper.createTaskItem(task)) : incompleteTasksList.appendChild(HTMLhelper.createTaskItem(task));
    });
};
