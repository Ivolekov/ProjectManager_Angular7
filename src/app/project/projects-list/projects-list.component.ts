import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service'
import { Project } from '../../models/project.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  constructor(private service: ProjectService, private toastr: ToastrService, private router:Router) { }

  ngOnInit() {
    this.service.refreshProjectList();
  }

  onSelect(project){
    this.router.navigateByUrl('/project', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/project', project.Id])); 
    //console.log("onSelect: " +  project.Id)
  }

  populateProjectForm(project:Project){
      this.service.projectFormData = Object.assign({},project)
  }

  deleteProject(id, tasksCount){
    if (confirm("Are you sure to delete this project?")){
      if(tasksCount>0){
      this.toastr.error("The project has assigned tasks. Can not be deleted")
      return;
      }
      this.service.deleteProject(id).subscribe(
        res=>{
          this.service.refreshProjectList();
          //reset form
          this.service.projectFormData={
            Id:'',
            Title:'',
            Description: '',
            CreateDate: null,
            Tasks:[]
          }
          this.router.navigateByUrl('/project', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/project'])); 
          this.toastr.warning("Project was deleted")
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
}
