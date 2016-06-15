import { Component } from '@angular/core';

import { WorkspaceDetailComponent } from './workspace-detail.component';
import { WorkspaceNavbarComponent } from './workspace-navbar.component';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { RouteSegment, Router } from '@angular/router';

@Component({
  selector: 'workspace-app',
  template: `
    <workspace-navbar></workspace-navbar>
    <workspace-detail></workspace-detail>`,
    providers: [ ], 
    directives: [ WorkspaceNavbarComponent, WorkspaceDetailComponent, ROUTER_DIRECTIVES],
})
@Routes([
  {
    path: '/workspace/:id',
    component: WorkspaceDetailComponent
  }
])

export class AppComponent {
}

