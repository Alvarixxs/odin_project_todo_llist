import {show_list} from "../list/list";

const create_task = function (taskTitle, date, priority, notes) {
    return {taskTitle, date, priority, notes}
}

const handle_addTask = function (app) {
    let form = document.getElementById('form-task')
    let dialog = document.getElementById('dialog-task')

    let task = create_task(form['input-title'].value,
        form['input-date'].value,
        form['input-priority'].value,
        form['input-notes'].value)

    if (form.checkValidity() === false) {
        return
    }

    let list = app.get_list(form['input-list'].value)
    list.add(task)
    show_list(list)

    form.reset()
    dialog.close()
}

const handle_newTask = function(app) {
    let dialog = document.getElementById('dialog-task')
    let selector = document.getElementById('input-list')

    while (selector.firstChild) {
        selector.removeChild(selector.firstChild)
    }
    let lists = app.get_lists()

    for (let i = 0; i < lists.length; i++) {
        let option = document.createElement('option')
        option.textContent = lists[i].listTitle
        option.value = lists[i].listTitle
        selector.appendChild(option)
    }

    dialog.showModal()
}

const handle_closeTask = function() {
    let dialog = document.getElementById('dialog-task')
    dialog.close()
}

const setup_task_dialog = function(app) {
    let newTaskButton = document.getElementById("add-task");
    let addButton = document.getElementById("add-dialog-task");
    let closeButton = document.getElementById("close-dialog-task");

    newTaskButton.addEventListener('click', ev => handle_newTask(app))

    addButton.addEventListener('click', ev => handle_addTask(app))
    closeButton.addEventListener('click', ev => handle_closeTask())
}

const show_task = function (task, list) {
    let content = document.getElementById('content-tasks')
    let button = document.createElement('button')
    let p = document.createElement('p')
    p.className = 'content-text'

    if (task.priority === '1')
        button.innerHTML = `
        <svg class="content-task-svg-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>numeric-1-circle</title><path d="M10,7V9H12V17H14V7H10M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" /></svg>
        `
    else if (task.priority === '2')
        button.innerHTML = `
        <svg class="content-tasks-svg-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>numeric-2-circle</title><path d="M9,7V9H13V11H11A2,2 0 0,0 9,13V17H11L15,17V15H11V13H13A2,2 0 0,0 15,11V9A2,2 0 0,0 13,7H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" /></svg>
        `
    else if (task.priority === '3')
        button.innerHTML = `
        <svg class="content-tasks-svg-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>numeric-3-circle</title><path d="M15,15V13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 15,10.5V9C15,7.89 14.1,7 13,7H9V9H13V11H11V13H13V15H9V17H13A2,2 0 0,0 15,15M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" /></svg>
        `

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    p.appendChild(checkbox)
    checkbox.addEventListener('change', ev => {
        list.elim(task.taskTitle)
        show_list(list)
    })

    let textNode = document.createTextNode(task.taskTitle.toUpperCase());
    p.appendChild(textNode);

    button.appendChild(p)
    content.appendChild(button)

}

export { setup_task_dialog , show_task }