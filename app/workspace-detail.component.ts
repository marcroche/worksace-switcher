import { Component, Input, NgZone } from '@angular/core';
import { Workspace } from './model/workspace'
import { WorkspaceService } from './services/workspace.service';

@Component({
  selector: 'workspace-detail',
  template: `
    <div class="container" *ngIf="workspace">
      <div class="jumbotron">
        <h2>{{workspace.name}}</h2>
        <div><label>Spaces</label></div>
        <li *ngFor="let space of workspace.spaces">{{ space.name }}</li>
      </div>
    </div>
    `,
    providers: [ WorkspaceService ]
})

export class WorkspaceDetailComponent { 
    public workspace;
    public workspaces;
    
    constructor(private workspaceService: WorkspaceService, private zone: NgZone) {  
        //Angular 2 Router is not behaving as documented.. researching further
        window.onhashchange = function () {
            zone.run(() => {
                this.getWorkspace(this.parseRoute());
            });
        }.bind(this);

        this.getWorkspace(this.parseRoute());
    }

    getWorkspace(id) {
        this.workspaceService.getWorkspaces().then(workspaces => this.workspaces = workspaces)
            .then(() => this.workspace = this.workspaces.find(function(workspace) {
                return workspace.id === id; 
            }))
            .catch(error => console.error(error));
    }

    parseRoute() {
        if (window.location.hash) {
            var parts = window.location.hash.split('/');

            if (parts && parts.length === 3 && parts[1] === 'workspace') {
                return Number(parts[2]);
            }
        }
        return null;
    }
}
