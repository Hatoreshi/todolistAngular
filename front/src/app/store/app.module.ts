import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { AppComponent } from '../../TodoApp/components/MainPage/app.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer }), 
    AppComponent 
  ],
  providers: [],
})
export class AppModule {}