import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { Tasks } from './tasks';
 
@Injectable({
  providedIn: 'root'
})
export class TasksService implements OnInit {

  serviceUrl='http://localhost:3000/tasks'
  tasks:any=[]

  constructor(private http:HttpClient) {
   }
   customTasks:Observable<[]>
  ngOnInit(): void {
    
  }
    
   postTasks(task:Tasks):Observable<any>
   {
      return this.http.post(this.serviceUrl,task);
   }
   getTasks():Observable<any>
   {
   return this.http.get('http://localhost:3000/tasks')
   }
   deleteTasks(task):Observable<any>{
    return this.http.delete('http://localhost:3000/tasks'+'/'+task)
   }

   editTask(task):Observable<any>{
    return this.http.put(`http://localhost:3000/tasks/${task.id}`,task)
   }
  leng=0
   getCustomTasks(customDate):Observable<Tasks[]>{
    return this.http.get<Tasks[]>('http://localhost:3000/tasks') 
   }
}