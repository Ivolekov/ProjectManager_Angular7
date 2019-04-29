import { Injectable } from '@angular/core';
import { Project } from '../../models/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectFormData:Project
  readonly rootURL = 'http://localhost:5000/api'
  list:Project[];

  constructor(private http:HttpClient) { }

  postProject(){
    this.projectFormData.CreateDate = new Date()
    //need to remove Id proparty because of Guid. If Id proparty is pass, api can't parse it
    delete this.projectFormData.Id;
    return this.http.post(this.rootURL + '/Projects/PostProject', this.projectFormData);
  }
  putProject(){
    return this.http.put(this.rootURL + '/Projects/EditProject/' + this.projectFormData.Id, this.projectFormData);
  }
  deleteProject(id){
    return this.http.delete(this.rootURL+'/Projects/DeleteProjectById/' + id);
  }
  refreshProjectList(){
    this.http.get(this.rootURL + '/Projects/GetAllProjects')
    .toPromise()
    .then(res => this.list = res as Project[]);
  }
}
