import { Component, OnInit } from '@angular/core';
import { Task, TaskStatusEnum, TaskStatus2LabelMapping } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';




@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = {    
    description: '',
    date: new Date(),
    status: TaskStatusEnum.CREATED
  };
  submitted = false;

  public taskStatus2LabelMapping = TaskStatus2LabelMapping;

  public taskStatusSelected = Object.values(TaskStatusEnum).filter(value => typeof value === 'number');  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      description: this.task.description,
      date: this.task.date,
      status: this.task.status
    };

    this.taskService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTask(): void {
    this.submitted = false;
    this.task = {      
      description: '',
      date: new Date(),
      status: TaskStatusEnum.CREATE
    };
  }
}
