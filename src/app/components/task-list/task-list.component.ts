import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EditTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() notImportant = new EventEmitter<any>();
  @Output() notComplete = new EventEmitter<any>();
  @Output() taskSaved = new EventEmitter<any>();

  editingTask: any = null;

  startEditing(task: any) {
    this.editingTask = task;
  }

  updateTask(updatedTask: any) {
    const index = this.taskList.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.taskList[index] = updatedTask;
    }
  }

  markImportant(task: any) {
    task.important = !task.important; // Toggle importance
    if (task.important) {
      this.important.emit(task); // Emit updated task for important tasks
    } else {
      this.notImportant.emit(task); // Emit updated task for non-important tasks
    }
  }
  markComplete(task: any) {
    task.completed = !task.completed; // Toggle importance
    if (task.completed) {
      this.complete.emit(task); // Emit updated task for important tasks
    } else {
      this.notComplete.emit(task); // Emit updated task for non-important tasks
    }
  }
}
