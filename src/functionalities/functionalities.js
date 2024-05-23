
import {create_list, show_list} from "../list/list";
import {compareAsc, format} from 'date-fns'

const all_tasks = function (lists) {
    let all_tasks = []

    for (let i = 0; i < lists.length; i++) {
        let tasks = lists[i].tasks
        for (let j = 0; j < tasks.length; j++) {
            all_tasks.push(tasks[j])
        }
    }
    console.log(all_tasks)
    return all_tasks
}

const add_all_tasks = function (list, tasks) {
    for (let i=0; i < tasks.length; i++) {
        list.tasks.push(tasks[i])
    }
}

const show_all_tasks = function(app) {
    let list = create_list('All tasks')

    let tasks = all_tasks(app.all_lists)

    add_all_tasks(list, tasks)
    show_list(list)
}

const show_today = function (app) {
    let list = create_list('Today')
    let tasks = all_tasks(app.all_lists)
    let today = tasks.filter(task => {
        return compareAsc(task.date, format(new Date(), 'yyyy-MM-dd')) === 0;
    })
    add_all_tasks(list, today)

    show_list(list)
}

const show_overdue = function(app) {
    let list = create_list('Overdue')
    let tasks = all_tasks(app.all_lists)
    let overdue = tasks.filter(task => {
        return compareAsc(task.date, format(new Date(), 'yyyy-MM-dd')) < 0;
    })
    add_all_tasks(list, overdue)

    show_list(list)
}

const setup_functionalities = function (app) {
    let allButton = document.getElementById('all-tasks')
    let todayButton = document.getElementById('today-tasks')
    let overdueButton = document.getElementById('overdue-tasks')

    allButton.addEventListener('click', ev => show_all_tasks(app))
    todayButton.addEventListener('click', ev => show_today(app))
    overdueButton.addEventListener('click', ev => show_overdue(app))
}

export {setup_functionalities}