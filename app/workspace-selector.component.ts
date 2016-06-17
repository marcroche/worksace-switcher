import { Component, ElementRef } from '@angular/core';
import { Workspace } from './model/workspace'
import { WorkspaceService } from './services/workspace.service';

@Component({
  selector: 'workspace-selector',
  template: `
    <li>
        <i *ngIf="selectorOpen" class="glyphicon glyphicon-search menu-icon" (click)="toggle()"></i>
        <input *ngIf="selectorOpen" type="text" class="search-field"  (keyup)="onKeyUp($event)">

        <i *ngIf="!selectorOpen" class="glyphicon glyphicon-menu-hamburger menu-icon" (click)="toggle()"></i>
        <span *ngIf="!selectorOpen" class="selector-label">Choose a workspace</span>
    </li>   
    
    <li class="dropdown" style="display: none">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Workspaces <span class="caret"></span></a>
        <ul class="dropdown-menu">
            <li *ngFor="let workspace of workspaces">
                <a href="#/workspace/{{ workspace.id }}">{{ workspace.name }}</a>
            </li>
        </ul>
    </li>
    <router-outlet></router-outlet>

    <div *ngIf="selectorOpen" class="workspace-flyout" (window:keydown)="onKey($event)">
        <div *ngFor="let workspace of workspaces">
            <h4>
                <img src="{{ workspace.image.thumbnail_link }}" class="header-img" />
                <span class="ws-header">{{workspace.name}}</span>
            </h4>
            <div *ngFor="let space of workspace.spaces" class="item-list">
                <span class="glyphicon glyphicon-unchecked item-img" [class.selected-space]="space.selected"></span>
                <span [innerHTML]="space.name"></span>
            </div>
        </div>
    </div>
  `,
  providers: [ WorkspaceService ],
})

export class WorkspaceSelectorComponent {
    public workspaces: Workspace[];
    public selectorOpen = false;
    public spaces = [];

    constructor(private workspaceService: WorkspaceService, public element: ElementRef) {
    }

    onKey(event) {
        // up 38 - down - 40 enter - 13
        if (event.keyCode === 38 || event.keyCode === 40) {
            this.navigateWithArrow(event.keyCode);
        }
        console.log(event.keyCode);
    }

    onKeyUp(event) {
        this.getWorkspaces().then(() => {
            if (event.target.value < 1) {
                return;
            }

            this.highlightMatchingText(event.target.value);        
            this.filterVisibleSpaces();         
            this.selectFirstSpace();
            this.flattenSpaces();
        });
    }

    toggle(event) {
        this.getWorkspaces().then(() => {
            this.selectorOpen = !this.selectorOpen;
            this.selectFirstSpace();
            this.flattenSpaces();
        });
    }

    getWorkspaces() {
        return this.workspaceService.getWorkspaces()
            .then(workspaces => this.workspaces = workspaces)
            .catch(error => console.error(error));
    }

    navigateWithArrow(keyCode) {
        for (var i = 0; i < this.spaces.length; i++) {
            if (this.spaces[i].selected) {
                if(keyCode === 40) {
                    if (i !== this.spaces.length - 1) {
                        this.spaces[i].selected = false;
                        this.spaces[i + 1].selected = true;
                        return;
                    }
                } else {
                    if (i !== 0) {
                        this.spaces[i].selected = false;
                        this.spaces[i - 1].selected = true;
                        return;
                    }
                }
            }
        }
    }

    highlightMatchingText(targetValue) {
        for (var workspace of this.workspaces) {
            for (var space of workspace.spaces) {
                if (space.name.toLowerCase().indexOf(targetValue.toLowerCase()) > -1) {
                    space.name = space.name.replace(new RegExp('('+ targetValue +')', 'gi'), '<span class="highlighted">$1</span>');
                    space.visible = true;
                } else {
                    space.visible = false;
                }
            } 
        }
    }

    filterVisibleSpaces() {
        for ( var i = 0; i < this.workspaces.length; i++) {
            this.workspaces[i].spaces = this.workspaces[i].spaces.filter((space) => {
                return space.visible;
            }); 
        }
    }

    selectFirstSpace() {
        for (var workspace of this.workspaces) {
            for (var space of workspace.spaces) {
                space.selected = false;
            } 
        }
        for (var workspace of this.workspaces) {
            for (var space of workspace.spaces) {
                space.selected = true;
                return;
            } 
        }
    }

    flattenSpaces() {
        this.spaces = [];
        for (var workspace of this.workspaces) {
            for (var space of workspace.spaces) {
                this.spaces.push(space); 
           }
        }
    }
}
