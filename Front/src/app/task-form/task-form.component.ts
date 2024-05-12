import { Component } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = { title: '', description: '', status: 'pending' };

  constructor(private taskService: TaskService, private router: Router) { }

  onSubmit(): void {
    this.taskService.createTask(this.task).subscribe();
    this.router.navigate(['/task-list']);
  }
}
