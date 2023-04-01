import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatusEnum, TaskStatus2LabelMapping} from 'src/app/models/task.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  providers: [DatePipe]
})
export class TaskDetailsComponent implements OnInit {
  @Input() viewMode = false;

  taskId!: string;
  currentTask!: Task;

  form!: FormGroup;
  
  public taskStatusEnum = TaskStatusEnum;
  public taskStatus2LabelMapping = TaskStatus2LabelMapping;

  public selectedValue = '';

  message = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.taskId = this.route.snapshot.params["taskId"];
      this.getTask(this.route.snapshot.params["taskId"]);

      this.form = new FormGroup({
        taskId: new FormControl(''),
        description: new FormControl('', [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        status: new FormControl('', [Validators.required])
      });
    }
  }  

  get f(){
    return this.form.controls;
  }


  getTask(taskId: string): void {
    this.taskService.get(taskId)
      .subscribe({
        next: (data) => {
          this.currentTask = {
            taskId : data.taskId,
            description : data.description,
            date : data.date,
            status : data.status            
          };
          this.taskId = data.taskId;
		      this.selectedValue = this.currentTask.status? this.currentTask.status.toString() : '1';
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }  

  updateTask(): void {
    this.message = '';

    this.taskService.update(this.taskId, this.form.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This task was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTask(): void {
    this.taskService.delete(this.currentTask.taskId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tasks']);
        },
        error: (e) => console.error(e)
      });
  }

}