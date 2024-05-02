import { Component ,inject} from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { EditTaskComponent } from '../../edit-task/edit-task.component';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent,EditTaskComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {
  taskList:any[]=[];
  httpService = inject(HttpService);
  
  ngOnInit(){
    this.getAllTasks();
  }
    getAllTasks(){
      this.httpService.getAllTasks().subscribe((result:any)=>{
        this.taskList=result.filter((x:any)=>x.completed==true);
      });
    }
    
    onComplete(task:any){
      task.completed=true;
      console.log("complete",task);
      this.httpService.updateTask(task).subscribe(()=>{
        this.getAllTasks();
      })
    }
    onNotComplete(task: any) {
      task.completed=false;
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks(); // Refresh tasks after update
      });
  }
    onImportant(task:any){
      task.important=true;
      console.log("important",task);
      this.httpService.updateTask(task).subscribe(()=>{
        this.getAllTasks();
      })
    }
    onNotImportant(task: any) {
      task.important=false;
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks(); // Refresh tasks after update
      });
  }
  updateTaskInList(updatedTask: any) {
    const index = this.taskList.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.taskList[index] = updatedTask;
    }
  }
}
