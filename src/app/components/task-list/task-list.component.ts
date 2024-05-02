import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,FormsModule,EditTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() taskList:any[]=[];
  @Output() important=new EventEmitter<any>();
  @Output() complete=new EventEmitter<any>();
  @Output()notImportant = new EventEmitter<any>();
  @Output() notComplete=new EventEmitter<any>();
  //httpService = inject(HttpService);
  editingTask: any = null;

   startEditing(task: any) {
    this.editingTask = task;
  }

  stopEditing() {
    this.editingTask = null;
  }
  // updateTask(updatedTask: any) {
  //   this.httpService.updateTask(updatedTask).subscribe(() => {
  //     const index = this.taskList.findIndex((task) => task.id === updatedTask.id);
  //     if (index !== -1) {
  //       this.taskList[index] = updatedTask;
  //     }
  //     this.getAllTasks(); // Refresh tasks after update (optional)
  //   });
  // }


  markImportant(task:any){
     //this.important.emit(task);
     task.important = !task.important; // Toggle importance
     if (task.important) {
       this.important.emit(task); // Emit updated task for important tasks
     } else {
       this.notImportant.emit(task); // Emit updated task for non-important tasks
     }
  }
  markComplete(task:any){
    //this.complete.emit(task);
    task.completed = !task.completed; // Toggle importance
     if (task.completed) {
       this.complete.emit(task); // Emit updated task for important tasks
     } else {
       this.notComplete.emit(task); // Emit updated task for non-important tasks
     }
  }
}
