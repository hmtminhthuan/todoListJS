
class validation {
    constructor() { }

    isEmpty(input) {
        if (input == null || input.trim() === '') { return true };
        return false;
    }

    isDuplicated(input, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (input.trim() === arr[i].taskName) { return true; }
        }
        return false;
    }
}
var statusOptions = ['todo', 'completed'];
var val = new validation();
class Task {

    constructor(id, taskName, status) {
        this.id = id;
        this.taskName = taskName;
        this.status = status;
    }
}


class TaskList {
    constructor() {
        this.arr = [];
    }
    _findIndex(id) {
        for (var i = 0; i < this.arr.length; i++) {
            if (id == this.arr[i].id) { return i; }
        }
        return -1;
    }
    _findIndexByName(name) {
        for (var i = 0; i < this.arr.length; i++) {
            if (name == this.arr[i].taskName) return i;
        }
        return -1;
    }
    addTask(task) { this.arr.push(task); }
    deleteTask(pos) {
        this.arr.splice(pos, 1);
    }
    getTaskByID(id) {
        if (this._findIndex(id) >= 0)
            return this.arr[this._findIndex(id)];
    }
    updateTask(pos, status) {
    }
}

var list = new TaskList();
layDataLocalStorage();
function printNumberOfTodo() {
    var count = 0;
    for (var i = 0; i < list.arr.length; i++) {
        if (list.arr[i].status == statusOptions[0]) count++;
    }
    if (count > 0) {
        document.getElementById('totalToDo').innerHTML = 'You Have ' + count + ' To Do Task';
        document.getElementById('totalToDo').style.display = 'block';
    } else {
        document.getElementById('totalToDo').style.display = 'none';
    }
}
function printNumberOfCompleted() {
    var count = 0;
    for (var i = 0; i < list.arr.length; i++) {
        if (list.arr[i].status == statusOptions[1]) count++;
    }
    if (count > 0) {
        document.getElementById('totalCompleted').innerHTML = 'You Have ' + count + ' Completed Task';
        document.getElementById('totalCompleted').style.display = 'block';
    } else {
        document.getElementById('totalCompleted').style.display = 'none';
    }
}
function createNewToDoTask(input) {
    var inputTask;
    if (list._findIndexByName(input) >= 0) {
        var pos = list._findIndexByName(input);
        inputTask = list.arr[pos];
        if (inputTask.status == statusOptions[1]) { createNewCompletedTask(pos); return; }
        inputTask.status = statusOptions[0];
    }
    else { inputTask = new Task(list.arr.length, input, statusOptions[0]); list.addTask(inputTask); }
    var newToDoTask = document.createElement('li');
    newToDoTask.id = "TaskID" + inputTask.id;
    var info = document.createElement('span');
    info.innerHTML = input;
    var buttonsDiv = document.createElement('div'); buttonsDiv.className = 'buttons d-flex';
    var remove = document.createElement('button'); remove.value = inputTask.id; remove.onclick = function () { removeToDoEvent(remove.value); };
    var complete = document.createElement('button'); complete.value = inputTask.id; complete.onclick = function () { completeDoEvent(complete.value); };
    var removeIcon = document.createElement('i'); removeIcon.className = 'fa fa-trash-alt remove bg-none border-none'; remove.appendChild(removeIcon);
    var completeIcon = document.createElement('i'); completeIcon.className = 'fa fa-check-circle complete bg-none border-none'; complete.appendChild(completeIcon);
    buttonsDiv.appendChild(remove);
    buttonsDiv.appendChild(complete);
    newToDoTask.appendChild(info);
    newToDoTask.appendChild(buttonsDiv);
    document.getElementById('todo').appendChild(newToDoTask);
    printNumberOfTodo();
    printNumberOfCompleted();
    luuLocalStorage();
}

function createNewCompletedTask(pos) {
    list.arr[pos].status = statusOptions[1];
    var newCompletedTask = document.createElement('li');
    newCompletedTask.id = 'TaskID' + list.arr[pos].id;
    var info = document.createElement('span');
    info.innerHTML = list.arr[pos].taskName;
    var buttonsDiv = document.createElement('div'); buttonsDiv.className = 'buttons d-flex';
    var remove = document.createElement('button'); remove.value = list.arr[pos].id; remove.onclick = function () {
        removeCompletedEvent(remove.value);
    };
    var completed = document.createElement('button'); completed.value = list.arr[pos].id; completed.onclick = function () {
        console.log(completed.value);
        unCompletedDoEvent(completed.value);
    };
    var removeIcon = document.createElement('i'); removeIcon.className = 'fa fa-trash-alt remove bg-none border-none'; remove.appendChild(removeIcon);
    var completedIcon = document.createElement('i'); completedIcon.className = 'fa fa-check-circle complete bg-none border-none'; completed.appendChild(completedIcon);
    buttonsDiv.appendChild(remove);
    buttonsDiv.appendChild(completed);
    newCompletedTask.appendChild(info);
    newCompletedTask.appendChild(buttonsDiv);
    document.getElementById('completed').appendChild(newCompletedTask);
    printNumberOfTodo();
    printNumberOfCompleted();
    luuLocalStorage();
}

function removeToDoEvent(id) {
    document.getElementById('warningNoti').style.display = 'none';
    var deletedTask = document.getElementById("TaskID" + id);
    list.deleteTask(list._findIndex(id));
    document.getElementById('todo').removeChild(deletedTask);
    printNumberOfTodo();
    printNumberOfCompleted();
    luuLocalStorage();
}
function removeCompletedEvent(id) {
    document.getElementById('warningNoti').style.display = 'none';
    var deletedTask = document.getElementById("TaskID" + id);
    document.getElementById('completed').removeChild(deletedTask);
    console.log('haha ' + list._findIndex(id));
    list.deleteTask(list._findIndex(id));
    printNumberOfTodo();
    printNumberOfCompleted();
    luuLocalStorage();
}
function completeDoEvent(id) {
    document.getElementById('warningNoti').style.display = 'none';
    list.arr[list._findIndex(id)].status = statusOptions[1];
    createNewCompletedTask(list._findIndex(id));
    var deletedTask = document.getElementById("TaskID" + id);
    document.getElementById('todo').removeChild(deletedTask);
    luuLocalStorage();
}

function unCompletedDoEvent(id) {
    document.getElementById('warningNoti').style.display = 'none';
    var deletedTask = document.getElementById("TaskID" + id);
    document.getElementById('completed').removeChild(deletedTask);
    list.arr[list._findIndex(id)].status = statusOptions[0];
    createNewToDoTask(list.arr[list._findIndex(id)].taskName);
}

document.getElementById('addItem').onclick = function () {
    var input = document.getElementById('newTask').value;
    document.getElementById('newTask').value = "";
    if (val.isEmpty(input)) {
        document.getElementById('warningNoti').innerHTML = 'The activity cannot be blank!';
        document.getElementById('warningNoti').style.display = 'block';
        return;
    }
    if (val.isDuplicated(input, list.arr)) {
        document.getElementById('warningNoti').innerHTML = 'The activity cannot be duplicated!';
        document.getElementById('warningNoti').style.display = 'block'; return;
    }
    createNewToDoTask(input);
    document.getElementById('warningNoti').style.display = 'none';
    luuLocalStorage();
};
function sortASC() {
    var sortArr = [];
    for (var i = 0; i < list.arr.length; i++) {
        if (list.arr[i].status == statusOptions[0]) {
            var deletedTask = document.getElementById("TaskID" + list.arr[i].id);
            document.getElementById('todo').removeChild(deletedTask);
            sortArr.push(list.arr[i].taskName);
        }
    }
    for (var i = 0; i < sortArr.length; i++) {
        for (var j = 0; j < sortArr.length; j++) {
            if (sortArr[j] > sortArr[i]) {
                var swap = sortArr[j];
                sortArr[j] = sortArr[i];
                sortArr[i] = swap;
            }
        }
    }
    for (var i = 0; i < sortArr.length; i++) {
        createNewToDoTask(sortArr[i]);
    }
}

function sortDES() {
    var sortArr = [];
    for (var i = 0; i < list.arr.length; i++) {
        if (list.arr[i].status == statusOptions[0]) {
            var deletedTask = document.getElementById("TaskID" + list.arr[i].id);
            document.getElementById('todo').removeChild(deletedTask);
            sortArr.push(list.arr[i].taskName);
        }
    }
    for (var i = 0; i < sortArr.length; i++) {
        for (var j = 0; j < sortArr.length; j++) {
            if (sortArr[j] < sortArr[i]) {
                var swap = sortArr[j];
                sortArr[j] = sortArr[i];
                sortArr[i] = swap;
            }
        }
    }
    for (var i = 0; i < sortArr.length; i++) {
        createNewToDoTask(sortArr[i]);
    }
}

function luuLocalStorage() {
    if (list.arr.length > 0) {
        var str = JSON.stringify(list.arr);
        localStorage.setItem('list', str);
    }
}
function layDataLocalStorage() {
    if (localStorage.getItem('list')) {
        var str = localStorage.getItem('list');
        list.arr = JSON.parse(str);
        for (var i = 0; i < list.arr.length; i++) {
            createNewToDoTask(list.arr[i].taskName);
        }
    }
}

