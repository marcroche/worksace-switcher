import { Component } from '@angular/core';
import { WorkspaceSelectorComponent } from './workspace-selector.component';

import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

@Component({
  selector: 'workspace-navbar',
  template: `
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <workspace-selector (onNavigate)="onNavigate($event)" class="nav navbar-nav"></workspace-selector>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ WorkspaceSelectorComponent ]
})

export class WorkspaceNavbarComponent {
  constructor(private router: Router) {

  }
  onNavigate(url) {
    this.router.navigateByUrl(url);
  }
}