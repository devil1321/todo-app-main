let tasks = [{
        name: 'Complete online JavaScript course',
        completed: true
    },
    {
        name: 'Jog around the park 3x',
        completed: false
    },
    {
        name: '10 minutes meditation',
        completed: false
    },
    {
        name: 'Read for one hour',
        completed: false
    },
    {
        name: 'Pick up grocieries',
        completed: false
    },
    {
        name: 'Complete Todo App on Front End Mentor',
        completed: false
    },
]
let storage = localStorage

const input = document.querySelector('.new-task');
let item = document.querySelector('.app__item');
const list = document.querySelector('.app__list');

const clearCompleted = document.querySelectorAll('.btn-clear')
const btnLeft = document.querySelectorAll('.btn-left')
const btnAll = document.querySelectorAll('.btn-all')
const btnActive = document.querySelectorAll('.btn-active')
const btnCompleted = document.querySelectorAll('.btn-completed')
const iconBtn = document.querySelector('.app__header-icon')
let body = document.querySelector('body');
class Tasks {
    static setTasks() {
            list.textContent = ''
            let tasks = Storage.getItem('tasks');
            tasks = JSON.parse(tasks)
            tasks.map(task => {
                        const { name, completed } = task
                        item = document.createElement('li');
                        item.classList = 'app__item column d-flex j-c-sb';
                        item.innerHTML = `<div class="app__task d-flex a-i-c">
                             ${completed ? 
                            `<div class="task-text d-flex a-i-c completed">`
                             :
                             `<div class='task-text d-flex a-i-c'>`}
                            ${completed ? 
                                `<label class="round">
                                <input class='completed' type="checkbox" checked>
                                    <span class="checkmark"></span>
                                </label>`
                                :
                                `<label class="round">
                                    <input class='completed' type="checkbox">
                                    <span class="checkmark"></span>
                                </label>`}
                                ${completed ? `<p class="completed-text">${name}</p>` : `<p>${name}</p>`}
                            <img style="${completed ? 'display:block;' : 'display:none'}" class='cross' src="./images/icon-cross.svg" alt=""></div>
                        </div>`
            list.appendChild(item)

        })
        let completed = tasks.filter(task => task.completed !== true);
        btnLeft.forEach(itemLeft => {
            itemLeft.textContent = completed.length + " left"
        })
        let crosses = document.querySelectorAll('.cross');
        let checkboxes = document.querySelectorAll('.completed')

        crosses.forEach(cross => {
            cross.addEventListener('click', function(e) {
                let name = e.target
                UI.removeItem(name)
            })
        });
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(e) {
                e.stopPropagation()
                e.preventDefault()
                let name = e.target
                UI.isChecked(name)
            })
        })
    }
}
class UI {
    static changeTheme(){
        if(body.classList.contains('light')){
            body.classList.remove('light')
            iconBtn.src = './images/icon-moon.svg'
        }else{
            body.classList.add('light')
            iconBtn.src = './images/icon-sun.svg'
        }
    }
    static showTasks(tasks) {
            list.textContent = ''
            tasks.map(task => {
                        const { name, completed } = task
                        item = document.createElement('li');
                        item.classList = 'app__item column d-flex j-c-sb';
                    
                        item.innerHTML =
                        `<div class="app__task d-flex a-i-c">
                             ${completed ? 
                            `<div class="task-text d-flex a-i-c completed">`
                             :
                             `<div class='task-text d-flex a-i-c'>`}
                            ${completed ? 
                                `<label class="round">
                                <input class='completed' type="checkbox" checked>
                                    <span class="checkmark"></span>
                                </label>`
                                :
                                `<label class="round">
                                    <input class='completed' type="checkbox">
                                    <span class="checkmark"></span>
                                </label>`}
                                ${completed ?`<p class="completed-text">${name}</p>` : `<p>${name}</p>`}
                            <img style="${completed ? 'display:block;' : 'display:none'}" class='cross' src="./images/icon-cross.svg" alt=""></div>
                        </div>`
               
            list.appendChild(item)


        })
        let completed = tasks.filter(task => task.completed !== true);
        btnLeft.forEach(itemLeft => {
            itemLeft.textContent = completed.length + " left"
        })
        let crosses = document.querySelectorAll('.cross');
        let checkboxes = document.querySelectorAll('.completed')

        crosses.forEach(cross => {
            cross.addEventListener('click', function(e) {
                let name = e.target
                UI.removeItem(name)
            })
        });
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(e) {
                let name = e.target
                UI.isChecked(name)
            })
        })
    }
    static addTask() {
        let name = input.value
        let tasks = Storage.getItem('tasks');
        tasks = JSON.parse(tasks);

        function Task(name, completed) {
            this.name = name;
            this.completed = completed;
        }
        const task = new Task(name, false)
        tasks.push(task);
        Storage.setStorage(tasks);
    }
    static removeItem(task) {
        const name = task.parentElement.textContent.trim()
        let tempTasks = Storage.getItem('tasks');
        tempTasks = JSON.parse(tempTasks)
        const tasks = tempTasks.filter(item => item.name !== name);
        Storage.setStorage(tasks);
        Tasks.setTasks();
    }
    static clearCompleted(e) {
        let modifier = document.querySelector('.blue')
        modifier.classList.remove('blue');
        e.target.classList.add('blue')
        let tempTasks = Storage.getItem('tasks');
        tempTasks = JSON.parse(tempTasks)
        let uncompleted = tempTasks.filter(task => task.completed !== true)
        Storage.setStorage(uncompleted)
        Tasks.setTasks()
    }
    static showAll(e) {
        let modifier = document.querySelector('.blue')
        modifier.classList.remove('blue');
        e.target.classList.add('blue')
        let tempTasks = Storage.getItem('tasks');
        tempTasks = JSON.parse(tempTasks)
        UI.showTasks(tempTasks)
    }
    static showCompleted(e) {
        let modifier = document.querySelector('.blue')
        modifier.classList.remove('blue');
        e.target.classList.add('blue')
        let tempTasks = Storage.getItem('tasks');
        tempTasks = JSON.parse(tempTasks)
        let completed = tempTasks.filter(task => task.completed === true)
        UI.showTasks(completed)
    }
    static showActive(e) {
        let modifier = document.querySelector('.blue')
        modifier.classList.remove('blue');
        e.target.classList.add('blue')
        let tempTasks = Storage.getItem('tasks');
        tempTasks = JSON.parse(tempTasks)
        let uncompleted = tempTasks.filter(task => task.completed !== true)
        UI.showTasks(uncompleted)
    }
    static isChecked(item) {
        const name = item.parentElement.parentElement.textContent.trim()
        let tasks = Storage.getItem('tasks')
        tasks = JSON.parse(tasks)
        let newTasks = [...tasks]
        let task = newTasks.find(item => item.name === name)
        let index = newTasks.indexOf(task)
        if(newTasks[index].completed === true){
            newTasks[index].completed = false
        }else {
            newTasks[index].completed = true
        }
        
        Storage.setStorage(newTasks);
        Tasks.setTasks();
    }
}
class Storage {
    static setStorage(tasks) {
        storage.setItem('tasks', JSON.stringify(tasks));
    }
    static getItem(name) {
        let tasks = storage.getItem(name);
        return tasks
    }
}

if (storage === null) {
    Storage.setStorage(tasks)
} else if (storage.length === 0) {
    Storage.setStorage(tasks)
}

window.addEventListener('DOMContentLoaded', (event) => {
    Tasks.setTasks();
    input.addEventListener('change', (e) => {
        e.stopPropagation()
        e.preventDefault()
        UI.addTask();
        Tasks.setTasks();

    })
    iconBtn.addEventListener('click',UI.changeTheme)
    btnLeft.forEach(btn => {
        btn.addEventListener('click', UI.showActive)
    })
    btnAll.forEach(btn => {
        btn.addEventListener('click', UI.showAll)
    })
    btnActive.forEach(btn => {
        btn.addEventListener('click', UI.showActive)
    })
    btnCompleted.forEach(btn => {
        btn.addEventListener('click', UI.showCompleted)
    })
    clearCompleted.forEach(btn => {
        btn.addEventListener('click', UI.clearCompleted)
    })

});