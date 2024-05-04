import { Component ,inject} from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { EditTaskComponent } from '../../edit-task/edit-task.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent,EditTaskComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {
  taskList:any[]=[];
  filteredTaskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);
  
  ngOnInit(){
    this.stateService.searchSubject.subscribe((searchQuery) => {
      this.filterTasks(searchQuery);
    });
    this.getAllTasks();
  }
    getAllTasks(){
      this.httpService.getAllTasks().subscribe((result:any)=>{
        this.taskList=result.filter((x:any)=>x.completed==true);
        this.filterTasks(this.stateService.searchSubject.value || '');
      });
    }

    filterTasks(searchQuery: string) {
      this.filteredTaskList = this.taskList.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
        this.getAllTasks(); 
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
        this.getAllTasks(); 
      });
  }
}
