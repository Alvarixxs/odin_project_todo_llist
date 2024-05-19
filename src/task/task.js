
const create_task = function (taskTitle, date, priority, notes) {
    return {taskTitle, date, priority, notes}
}

const handle_addTask = function (ev, dialog) {
    ev.preventDefault();

    let form = document.getElementById('form-task')
    let task = create_task(form['input-title'].value,
        form['input-date'].value,
        form['input-priority'].value,
        form['input-notes'].value)

    show_task(task)

    dialog.close()
    console.log(task)
}

const setup_dialog = function() {
    let newTaskButton = document.getElementById("add-task");
    let dialog = document.getElementById('dialog')
    let addTaskButton = document.getElementById("add-dialog");
    let closeButton = document.getElementById("close-dialog");

    newTaskButton.addEventListener('click', ev => dialog.showModal())

    addTaskButton.addEventListener('click', ev => handle_addTask(ev, dialog))
    closeButton.addEventListener('click', ev => {
        ev.preventDefault()
        dialog.close()
    })
}

const show_task = function (task) {
    let content = document.getElementById('content')
    let p = document.createElement('p')
    p.textContent = task.priority + " " + task.date + ": "+ task.taskTitle
    content.appendChild(p)
}

export { setup_dialog }