import './style.css'
import {setup_task_dialog} from "./task/task";
import  {setup_list_dialog} from "./list/list";
import { setup_functionalities } from "./functionalities/functionalities";

const create_app = function() {
    let all_lists = []

    const add_list = function(list) {
        all_lists.push(list)
    }

    const get_lists = function () {
        return all_lists
    }

    const get_list = function (listTitle) {
        let list = all_lists.filter( list => list.listTitle === listTitle)
        return list.pop()
    }

    return { add_list, get_lists , get_list }
}


const main = function () {
    let app = create_app()

    setup_task_dialog(app)
    setup_list_dialog(app)
    setup_functionalities(app)
}

main()