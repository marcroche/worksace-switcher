import { Component } from '@angular/core';

import { WorkspaceDetailComponent } from './workspace-detail.component';
import { WorkspaceNavbarComponent } from './workspace-navbar.component';
import { Routes, ROUTER_PROVIDERS } from '@angular/router';

@Component({
  selector: 'workspace-app',
  template: `
    <workspace-navbar></workspace-navbar>
    <workspace-detail></workspace-detail>`,
    providers: [ ROUTER_PROVIDERS ], 
    directives: [ WorkspaceNavbarComponent, WorkspaceDetailComponent ],
})
@Routes([
  {
    path: '/workspace/:id',
    component: WorkspaceDetailComponent
  }
])

export class AppComponent {
}

