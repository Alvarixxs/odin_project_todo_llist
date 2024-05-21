
const create_task = function (taskTitle, date, priority, notes) {
    return {taskTitle, date, priority, notes}
}

const handle_addTask = function (ev) {
    let form = document.getElementById('form-task')
    let dialog = document.getElementById('dialog-task')

    let task = create_task(form['input-title'].value,
        form['input-date'].value,
        form['input-priority'].value,
        form['input-notes'].value)


    if (form.checkValidity() === false) {
        return
    }

    let title = document.getElementById('content-title')
    title.current_list.add(task)
    console.log(title.current_list)
    show_task(task)

    form.reset()
    dialog.close()

    return task
}

const handle_newTask = function(ev) {
    let dialog = document.getElementById('dialog-task')

    dialog.showModal()
}

const handle_closeTask = function(ev) {
    let dialog = document.getElementById('dialog-task')
    dialog.close()
}

const setup_task_dialog = function(all_tasks) {
    let newTaskButton = document.getElementById("add-task");
    let addButton = document.getElementById("add-dialog-task");
    let closeButton = document.getElementById("close-dialog-task");

    newTaskButton.addEventListener('click', ev => {
        handle_newTask()
    })

    addButton.addEventListener('click', ev => all_tasks.push(handle_addTask(ev)))
    closeButton.addEventListener('click', ev => handle_closeTask(ev))
}

const show_task = function (task) {
    let content = document.getElementById('content-tasks')
    let p = document.createElement('p')
    p.textContent = task.priority + " " + task.date + ": "+ task.taskTitle
    content.appendChild(p)
}

export { setup_task_dialog , show_task }