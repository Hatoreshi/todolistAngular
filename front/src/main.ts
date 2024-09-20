import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './TodoApp/components/MainPage/app.component';
import { counterReducer } from './app/store/counter.reducer';
import { TaskService } from './TodoApp/services/taskService';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ count: counterReducer }),
    TaskService
  ]
})
.catch(err => console.error(err));