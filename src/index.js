import './style.css'
import {setup_task_dialog} from "./task/task";
import  {setup_list_dialog} from "./list/list";

let all_lists = []
let all_tasks = []

setup_task_dialog(all_tasks)
setup_list_dialog(all_lists)
