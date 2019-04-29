import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import {Task} from '../models/task.model';
import { Guid } from "guid-typescript";
export class Project {
    Id:string;
    Title:string;
    Description: string;
    CreateDate?: Date;
    Tasks:Task[];
}
