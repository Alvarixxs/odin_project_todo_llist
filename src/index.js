import './style.css'
import {setup_task_dialog} from "./task/task";
import {add_list_button, setup_list_dialog, show_list} from "./list/list";
import { setup_functionalities } from "./functionalities/functionalities";
import {create_list, } from "./list/list";

const create_app = function() {
    let all_lists = []
    let default_list = null

    return { all_lists }
}

const update_storage = function(app) {
    localStorage.setItem("app", JSON.stringify(app))
}

const load_storage = function() {
    if (localStorage.getItem("app")) {
        let app= JSON.parse(localStorage.getItem("app"))
        for (let i=0; i < app.all_lists.length; i++) {
            add_list_button(app.all_lists[i], app);
        }
        return app
    }
    else {
        let app = create_app()
        let general_list = create_list('General');
        add_list_button(general_list, app)
        app.all_lists.push(general_list)
        app.default_list = general_list
        update_storage(app)
        show_list(general_list, app)
        return app
    }
}

const main = function () {
    let app = load_storage()
    show_list(app.all_lists[0], app)
    console.log(app)
    setup_task_dialog(app)
    setup_list_dialog(app)
    setup_functionalities(app)
}

main()

export { update_storage }