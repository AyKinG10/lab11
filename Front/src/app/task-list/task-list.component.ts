import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedStatus: string = '';
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'status', 'actions'];

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  filteredTasks(): Task[] {
    if (!this.selectedStatus || this.selectedStatus === '') {
      return this.tasks;
    } else {
      return this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }

  updateTaskStatus(task: Task): void {
    if (task._id) {
      this.taskService.updateTask(task._id, task).subscribe();
    } else {
      console.error('Task ID is undefined');
    }
  }

  changeFilter(status: string): void {
    this.selectedStatus = status;
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result._id, result).subscribe(updatedTask => {
          const index = this.tasks.findIndex(t => t._id === updatedTask._id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        });
      }
    });
  }

  deleteTask(id: string | undefined): void {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.getTasks();
      });
    } else {
      console.error('Task ID is undefined');
    }
  }
}
