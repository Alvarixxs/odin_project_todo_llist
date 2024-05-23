import {show_task} from "../task/task";
import {bind} from "lodash";

const create_list = function (listTitle) {
    let tasks = []
    listTitle='#'+listTitle.replaceAll(' ','-')

    const get_tasks = function() {
        return tasks;
    }

    const add = function(task) {
        tasks.push(task)
    }

    const addAll = function(list_tasks) {
        for (let i=0; i < list_tasks.length; i++) {
            tasks.push(list_tasks[i])
        }
    }

    const elim = function(taskTitle) {
        tasks = tasks.filter(item => item.taskTitle !== taskTitle)
    }

    return { listTitle, get_tasks, add, addAll, elim };
}

const handle_addList = function (app) {
    let form = document.getElementById('form-list');
    let dialog = document.getElementById('dialog-list')

    if (form.checkValidity() === false) {
        return
    }
    let list = create_list(form['input-name'].value);

    app.add_list(list)
    add_list_button(list, app)
    form.reset()
    dialog.close()
}

const handle_newList = function () {
    let dialog = document.getElementById('dialog-list')
    dialog.showModal()
}

const handle_closeList = function() {
    let dialog = document.getElementById('dialog-list')
    dialog.close()
}

const add_list_button = function (list, app) {
    let sidebar = document.getElementById('sidebar');
    let div = document.createElement('div')
    div.className = 'sidebar-list'

    // first button contains svg and text
    let button1 = document.createElement('button');
    button1.className = 'sidebar-edit'
    button1.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>folder-check</title>
        <path d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.12 13.3 20.1 13 19 13C15.69 13 13 15.69 13 19M21.34 15.84L17.75 19.43L16.16 17.84L15 19L17.75 22L22.5 17.25L21.34 15.84Z" />
    </svg>`;
    let p = document.createElement('p');
    p.textContent = list.listTitle;
    button1.appendChild(p);

    button1.addEventListener('click', ev => {
        show_list(list)
    })
    div.appendChild(button1)

    if (list.listTitle !== '#General') {
        // second button contains remove button
        let button2 = document.createElement('button')
        button2.className = 'sidebar-remove'
        button2.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`
        div.appendChild(button2)

        button2.addEventListener('click', ev => {
            sidebar.removeChild(div)
            app.elim(list.listTitle)
            show_list(app.get_default())
        })
    }

    sidebar.appendChild(div);
}

const show_list = function (list) {
    let title = document.getElementById('content-title')
    title.textContent = list.listTitle

    show_all_tasks(list.get_tasks(), list)
}

const show_all_tasks = function (tasks, list) {
    let content = document.getElementById('content-tasks')
    while (content.firstChild) {
        content.removeChild(content.firstChild)
    }

    for (let i=0; i<tasks.length; i++) {
        show_task(tasks[i], list)
    }
}


const setup_list_dialog = function(app) {
    let newButton = document.getElementById("new-list");
    let addButton = document.getElementById("add-dialog-list");
    let closeButton = document.getElementById("close-dialog-list");

    // add button for general
    let general_list = create_list('General');
    add_list_button(general_list, app)
    app.add_list(general_list)
    app.set_default(general_list)
    show_list(general_list)

    newButton.addEventListener('click', ev => {
        handle_newList(ev)
        addButton.focus()
    })

    addButton.addEventListener('click', ev => handle_addList(app))

    closeButton.addEventListener('click', ev => handle_closeList())
}

export { setup_list_dialog, create_list, show_list }