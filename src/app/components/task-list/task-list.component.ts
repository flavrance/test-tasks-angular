import { Component,OnInit  } from '@angular/core';
import { elementAt } from 'rxjs';
import { Task, enum2LabelMapping } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks?: Task[];
  tasksView?: any[] = [];
  currentTask: Task = {};
  currentIndex = -1;
  description = '';
  
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll()
      .subscribe({
        next: (data) => {
          data.forEach(element => {
            const task = {
              taskId: element.taskId,              
              description: element.description,
              date: element.date,
              status: this.taskStatus2LabelMapping(element.status?.toString()),
            };
            this.tasksView?.push(task);
          });
          this.tasks = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  removeAllTasks(): void {
    this.taskService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  taskStatus2LabelMapping(index : any) : any {
    return enum2LabelMapping.get(index);
  }

  searchDescription(description: any): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByDescription(description)
      .subscribe({
        next: (data) => {
          this.tasks = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
