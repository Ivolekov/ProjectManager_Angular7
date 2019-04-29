import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  isNameNotValidLenght = false;
  isDescriptionNotValidLenght = false;
  isWorkHoursNotValid = false;

  constructor(private taskService:TaskService, private projectService:ProjectService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetTaskForm();
  }

  resetTaskForm(form?:NgForm){
    if(form != null){
      form.resetForm();
    }
    this.taskService.taskFormData={
      Id:'',
      Name:'',
      Description: '',
      CreatedDate: null,
      WorkHours:null,
      ProjectId:''
    }
  }

  onSubmitTask(form:NgForm){
    let projectId = this.route.snapshot.paramMap.get('id')

    //validation of task form 
    if(this.taskService.taskFormData.Name.length > 100){
      this.isNameNotValidLenght = true;
      return;
    }
    if(this.taskService.taskFormData.Description.length > 250){
      this.isDescriptionNotValidLenght = true;
      return;
    }
    if(this.taskService.taskFormData.WorkHours <= 0 || this.taskService.taskFormData.WorkHours > 24){
      this.isWorkHoursNotValid = true;
      return;
    }
    //hide alert msg in the dom
    this.isNameNotValidLenght = false;
    this.isDescriptionNotValidLenght = false;
    this.isWorkHoursNotValid = false;

    if(this.taskService.taskFormData.Id==''){
      this.createTaskInProject(form, projectId);
    }else{
      this.updateTaskInProject(form, projectId);
    }   
  }

  createTaskInProject(form:NgForm, projectId:string){
    this.taskService.postTask(projectId).subscribe(
      res => {
        this.resetTaskForm(form);
        this.taskService.refreshTasksList(projectId)
        this.projectService.refreshProjectList();
        this.toastr.success("Task was created")
      },
      err => {
        console.log(err);
      }
    )
  }

  updateTaskInProject(form:NgForm, projectId:string){
    this.taskService.putTask().subscribe(
      res => {
        this.resetTaskForm(form);
        this.toastr.info("Task was edited")
        this.taskService.refreshTasksList(projectId)
      },
      err => {
        console.log(err);
      }
    )
  }

}
