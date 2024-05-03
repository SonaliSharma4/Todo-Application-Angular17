import { Component, Input, Output, EventEmitter,inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TaskListComponent } from '../task-list/task-list.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ FormsModule,TaskListComponent,PageTitleComponent,CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input() task: any;
  @Output() taskSaved = new EventEmitter<any>();

  constructor(private httpService: HttpService) {}

  saveEditedTask() {
    if (this.task) {
      this.httpService.updateTask(this.task).subscribe(
        (updatedTask: any) => {
          console.log('Task updated successfully:', updatedTask);
          this.taskSaved.emit(updatedTask); // Emit updated task to parent component
        },
        error => {
          console.error('Error updating task:', error);
        }
      );
    }
  }
}
