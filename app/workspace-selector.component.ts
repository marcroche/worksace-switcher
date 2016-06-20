import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Workspace } from './model/workspace'
import { WorkspaceService } from './services/workspace.service';
//import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

@Component({
  selector: 'workspace-selector',
  template: `
    <li>
        <i *ngIf="selectorOpen && !hasText" class="glyphicon glyphicon-search menu-icon" (click)="toggle()"></i>
        <i *ngIf="selectorOpen && hasText" class="glyphicon glyphicon-remove menu-icon" (click)="clear()"></i>
        <input #inputField *ngIf="selectorOpen" type="text" class="search-field"  (keyup)="onKeyUp($event)">

        <i *ngIf="!selectorOpen" class="glyphicon glyphicon-menu-hamburger menu-icon" (click)="toggle()"></i>
        <span *ngIf="!selectorOpen" class="selector-label">Choose a workspace</span>
    </li>   
    
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
  directives: [ ],
  providers: [ WorkspaceService ],
})

export class WorkspaceSelectorComponent {
    public workspaces: Workspace[];
    public selectorOpen = false;
    public spaces = [];
    private hasText = false;
    @Output() onNavigate = new EventEmitter<string>();
    @ViewChild('inputField') element: ElementRef;

    constructor(private workspaceService: WorkspaceService) {
    }

    onKey(event) {
        if (event.keyCode === 38 || event.keyCode === 40) {
            this.navigateWithArrow(event.keyCode);
        } else if (event.keyCode === 13) {
            var space = this.getSelectedSpace();
            if (space !== undefined) {
                this.onNavigate.emit('workspace/' + space.id);
            }
        }
    }

    onKeyUp(event) {
        if (event.keyCode === 38 || 
            event.keyCode === 40 || 
            event.keyCode === 13) {
            return;
        }

        this.getWorkspaces().then(() => {
            if (event.target.value < 1) {
                this.hasText = false;
                return;
            }
            this.hasText = true;
            this.highlightMatchingText(event.target.value);        
            this.filterVisibleSpaces();         
            this.selectFirstSpace();
            this.flattenSpaces();
        });
    }

    clear() {
        this.getWorkspaces().then(() => {
            this.element.nativeElement.value = '';
            this.hasText = false;
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

    getSelectedSpace() {
        return this.spaces.find((space) => {
            return space.selected == true;
        });
    }
}
