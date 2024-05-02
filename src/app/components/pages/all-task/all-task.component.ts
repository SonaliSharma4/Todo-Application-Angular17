import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';
import { EditTaskComponent } from '../../edit-task/edit-task.component';

@Component({                                                                      
  selector: 'app-all-task',
  standalone: true,
  imports: [EditTaskComponent,FormsModule,DatePipe,PageTitleComponent,TaskListComponent,EditTaskComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent {
  newTask="";
  initialTaskList:any[]=[];
  taskList:any[]=[];
  httpService = inject(HttpService);
  stateService=inject(StateService);

  ngOnInit(){
    this.stateService.searchSubject.subscribe((value)=>{
      console.log("search",value);
      if(value){
        this.taskList = this.initialTaskList.filter((x)=>
        x.title.toLowerCase().includes(value.toLowerCase())
        );
      }else{
        this.taskList=this.initialTaskList;
      }
    });
    this.getAllTasks();
  }
  addTask()
  {
    console.log("addTask",this.newTask);
    this.httpService.addTask(this.newTask)
      .subscribe(()=>{
      this.newTask = '';
      this.getAllTasks();
      });
    }
    getAllTasks(){
      this.httpService.getAllTasks().subscribe((result:any)=>{
        this.initialTaskList = this.taskList =result;
      });
    }
    onComplete(task:any){
      task.completed=true;
      console.log("complete",task);
      this.httpService.updateTask(task).subscribe(()=>{
        this.getAllTasks();
      });
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
      });
  }
  onNotImportant(task: any) {
    task.important=false;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks(); // Refresh tasks after update
    });
  }
  updateTask(updatedTask: any) {
    this.httpService.updateTask(updatedTask).subscribe(() => {
      const index = this.taskList.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        this.taskList[index] = updatedTask;
      }
      this.getAllTasks(); // Refresh tasks after update (optional)
    });
  }
  }
