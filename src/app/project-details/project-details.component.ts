import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task/task.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService:TaskService) { }

  ngOnInit() {
    let projectId = this.route.snapshot.paramMap.get('id')
    this.taskService.refreshTasksList(projectId);
    this.taskService.getCurrentProject(projectId);
    //console.log(projectId);
  }
}
