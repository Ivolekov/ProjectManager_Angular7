import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  isTitleNotValitLenght = false;
  isDescriptionNotValitLenght = false;
  
  constructor(private service:ProjectService, private toastr:ToastrService) {
   
   }
  
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null){
      form.resetForm();
    }
    this.service.projectFormData={
      Id:'',
      Title:'',
      Description: '',
      CreateDate: null,
      Tasks:[]
    }
  }

  onSubmit(form:NgForm){
    //validation of project form
    if(this.service.projectFormData.Title.length > 100){
      this.isTitleNotValitLenght = true;
      return;
    }
    if(this.service.projectFormData.Description.length > 250){
      this.isDescriptionNotValitLenght = true;
      return;
    }

    if(this.service.projectFormData.Id==''){
      this.createProject(form);
    }else{
      this.updateProject(form);
    }
    //hide alert msg in the dom
    this.isTitleNotValitLenght = false;
    this.isDescriptionNotValitLenght = false;
  }

  createProject(form:NgForm){
    this.service.postProject().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("Project was created")
        this.service.refreshProjectList()
      },
      err => {
        console.log(err);
      }
    )
  }

  updateProject(form:NgForm){
    this.service.putProject().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info("Project was edited")
        this.service.refreshProjectList()
      },
      err => {
        console.log(err);
      }
    )
  }
}
