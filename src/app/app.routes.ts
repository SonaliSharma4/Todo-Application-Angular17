import { Routes } from '@angular/router';
import { AllTaskComponent } from './components/pages/all-task/all-task.component';
import { ImportantTasksComponent } from './components/pages/important-tasks/important-tasks.component';
import { CompletedTasksComponent } from './components/pages/completed-tasks/completed-tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: AllTaskComponent,
  },
  {
    path: 'importants',
    component: ImportantTasksComponent,
  },
  {
    path: 'completed',
    component: CompletedTasksComponent,
  },
];
