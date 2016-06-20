import { Component, OnInit } from '@angular/core';
import { Workspace } from './model/workspace'
import { WorkspaceService } from './services/workspace.service';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { Router, RouteSegment, OnActivate } from '@angular/router';

@Component({
  selector: 'workspace-detail',
  template: `
    <div class="container" *ngIf="space">
      <div class="jumbotron">
        <h2>{{space.name}}</h2>
      </div>
    </div>
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ WorkspaceService ],
})

export class WorkspaceDetailComponent implements OnActivate { 
    public workspace;
    public space;
    public workspaces;

    routerOnActivate(routeSegment: RouteSegment) {
        this.getWorkspace(Number(routeSegment.getParam('id')));
    }

    constructor(private workspaceService: WorkspaceService) {  
    }

    getWorkspace(id) {
        this.workspaceService.getWorkspaces().then(workspaces => this.workspaces = workspaces)
            .then(() => {
                for (var workspace of this.workspaces) {
                    for (var space of workspace.spaces) {
                        if (space.id === id) {
                            this.space = space;
                            return;
                        }
                    }
                }
            })
            .catch(error => console.error(error));
    }
}
