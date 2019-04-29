import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private projectService:ProjectService, private toastr:ToastrService) { }

  ngOnInit() {
    
  }
  populateTaskForm(task:Task){
    this.taskService.taskFormData = Object.assign({},task)
}
  deleteTask(id, projectId){
    if (confirm("Are you sure to delete this task?")){
      this.taskService.deleteTask(id).subscribe(
        res=>{
          this.taskService.refreshTasksList(projectId);
          this.projectService.refreshProjectList();
          //reset form
          this.taskService.taskFormData={
            Id:'',
            Name:'',
            Description: '',
            CreatedDate: null,
            WorkHours:null,
            ProjectId:''
          }
          this.toastr.warning("Task was deleted")
        },
        err=>{
          console.log(err)
        }
      )
    }
  }
}
