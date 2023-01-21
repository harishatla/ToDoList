import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Tasks } from '../tasks';
import { TasksService } from '../tasks.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {
  newTasks = this.formBuilder.group({
    task:['',Validators],
    date:[''],
  })
  taskObj:Tasks = new Tasks();
  toDolist=[]
  taskUpdateValue=''
  customDate:Date
  customTasks=[]
  tasksStats=false

  constructor(private formBuilder:FormBuilder, private tasksService:TasksService) { }

  ngOnInit(): void {
    this.taskObj = new Tasks();
    this.tasksService.getTasks().subscribe(response=>{
      this.toDolist=response
      console.log(this.toDolist);
    })
  }

  taskDone(task){
    this.tasksStats = true
    this.taskObj=task;
    this.taskObj.status = this.tasksStats
    this.tasksService.editTask(this.taskObj).subscribe(res=>{
      console.log(task);
    })
     
  }

  addTask(item){
    console.log("called")
    this.taskObj.task= item.value.task;
    this.taskObj.date=item.value.date;
    this.taskObj.status=false;
    this.tasksService.postTasks(this.taskObj).subscribe(res =>{
      console.log(res);
      this.ngOnInit()
      this.newTasks.reset()
    });
  }

  getTasks(){
    this.tasksService.getTasks().subscribe(res=>{
      console.log(res);
    })
  } 

  deleteTask(task){
    console.log(task.id);
    this.tasksService.deleteTasks(task.id).subscribe(res=>{
      console.log(res);
      this.ngOnInit()
    })
  }

  editTask(){
    this.taskObj.task=this.taskUpdateValue
    this.tasksService.editTask(this.taskObj).subscribe((res)=>{
      this.ngOnInit()
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
  call(task){
    console.log(task.task)
    this.taskObj=task;
    this.taskUpdateValue=task.task;
  }

  customtasks(){
    console.log(this.customDate)
    this.tasksService.getCustomTasks(this.customDate).subscribe(res=>{
       res.forEach(ele=>{
        // console.log(ele.task)
        if(ele.date==this.customDate){
          this.customTasks.push(ele);
        }
      })
      console.log(this.customTasks)
    })
     
  }
}
