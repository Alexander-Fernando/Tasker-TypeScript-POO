//Referencias elementos del DOM
const buttonAddTask = document.querySelector('#add-task')!;
const inputTask = <HTMLInputElement>document.querySelector('#new-task')!;
const incompleteTasksList = document.querySelector('#incomplete-tasks')!;
const completedTasksList = document.querySelector('#completed-tasks')!;

//Clase que representa una tarea
class TodoTask {
  constructor(public task: string, public isCompleted: boolean) {}
}

//Administador de las tareas
class TaskManager {
  tasks: TodoTask[] = [];
  //Método para agregar una tarea
  addTask(task: string): void {
    const newTask = new TodoTask(task, false);
    this.tasks.push(newTask);
  }
}

class HTMLhelper {
  static createTaskItem(task: TodoTask): HTMLLIElement {
    const li = document.createElement('li');
    const input = document.createElement('input');

    input.addEventListener('change', () => {
      input.checked ? (task.isCompleted = true) : null;
      printTaskHTML();
    });

    const label = document.createElement('label');

    input.type = 'checkbox';
    label.innerText = task.task;

    li.appendChild(input);
    li.appendChild(label);

    return li;
  }

  static cleanInput() {
    inputTask.value = '';
  }
}

const taskManager = new TaskManager();

//EventListeners
buttonAddTask.addEventListener('click', () => {
  if (inputTask.value.trim().length < 3) {
    return alert('La tarea debe tener 3 dígitos o más');
  }
  taskManager.addTask(inputTask.value);
  printTaskHTML();
  HTMLhelper.cleanInput();
});

const printTaskHTML = (): void => {
  completedTasksList.innerHTML = '';
  incompleteTasksList.innerHTML = '';

  taskManager.tasks.forEach((task) => {
    task.isCompleted
      ? completedTasksList.appendChild(HTMLhelper.createTaskItem(task))
      : incompleteTasksList.appendChild(HTMLhelper.createTaskItem(task));
  });
};
