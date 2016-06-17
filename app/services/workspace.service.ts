import { Injectable } from '@angular/core';
import { Workspace } from '../model/workspace'
import { Http  } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WorkspaceService {
    private workspaces;
    private spacesUrl = '/data/spaces.json';

    getWorkspaces(): Promise<Workspace[]> {
        return this.http.get(this.spacesUrl)
               .toPromise()
               .then(response => {
                   return response.json(); 
                })
               .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
    }
}