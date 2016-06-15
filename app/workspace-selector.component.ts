import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Workspace } from './model/workspace'
import { WorkspaceService } from './services/workspace.service';

@Component({
  selector: 'workspace-selector',
  template: `
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Workspaces <span class="caret"></span></a>
        <ul class="dropdown-menu">
            <li *ngFor="let workspace of workspaces">
                <a href="#/workspace/{{ workspace.id }}">{{ workspace.name }}</a>
            </li>
        </ul>
    </li>
    <router-outlet></router-outlet>
  `,
  providers: [ WorkspaceService ],
})

export class WorkspaceSelectorComponent implements OnInit {
    workspaces: Workspace[];

    ngOnInit() {
        this.getWorkspaces()
    }

    constructor(private workspaceService: WorkspaceService) { 
    }

    getWorkspaces() {
        this.workspaceService.getWorkspaces()
            .then(workspaces => this.workspaces = workspaces)
            .catch(error => console.error(error));
    }
}
