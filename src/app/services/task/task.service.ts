import { Injectable } from '@angular/core';
import {Task} from '../../models/task.model';
import {HttpClient} from '@angular/common/http';
import { Project } from 'src/app/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskFormData:Task
  readonly rootURL = 'http://localhost:5000/api'
  tasksList:Task[];
  currentProject:Project;

  constructor(private http:HttpClient) { }

  refreshTasksList(projectId){
    this.http.get(this.rootURL + '/Tasks/GetAllTasksByProjectId/'+ projectId)
    .toPromise()
    .then(res => this.tasksList = res as Task[]);
  }
  getCurrentProject(projectId){
    this.http.get(this.rootURL + '/Projects/GetProjectById/'+projectId)
    .toPromise()
    .then(res => this.currentProject = res as Project);
  }
  postTask(projectId){
    this.taskFormData.CreatedDate = new Date()
    this.taskFormData.ProjectId = projectId;
    //need to remove Id proparty because of Guid. If Id proparty is pass, api can't parse it
    delete this.taskFormData.Id;
    return this.http.post(this.rootURL + '/Tasks/PostTaskInProject', this.taskFormData);
  }
  putTask(){
    return this.http.put(this.rootURL + '/Tasks/EditTaskById/' + this.taskFormData.Id + '/' + this.taskFormData.ProjectId, this.taskFormData);
  }
  deleteTask(id){
    return this.http.delete(this.rootURL+'/Tasks/DeleteTaskById/' + id);
  }
}
