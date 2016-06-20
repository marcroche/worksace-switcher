"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var workspace_service_1 = require('./services/workspace.service');
//import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
var WorkspaceSelectorComponent = (function () {
    function WorkspaceSelectorComponent(workspaceService) {
        this.workspaceService = workspaceService;
        this.selectorOpen = false;
        this.spaces = [];
        this.hasText = false;
        this.onNavigate = new core_1.EventEmitter();
    }
    WorkspaceSelectorComponent.prototype.onKey = function (event) {
        if (event.keyCode === 38 || event.keyCode === 40) {
            this.navigateWithArrow(event.keyCode);
        }
        else if (event.keyCode === 13) {
            var space = this.getSelectedSpace();
            if (space !== undefined) {
                this.onNavigate.emit('workspace/' + space.id);
            }
        }
    };
    WorkspaceSelectorComponent.prototype.onKeyUp = function (event) {
        var _this = this;
        if (event.keyCode === 38 ||
            event.keyCode === 40 ||
            event.keyCode === 13) {
            return;
        }
        this.getWorkspaces().then(function () {
            if (event.target.value < 1) {
                _this.hasText = false;
                return;
            }
            _this.hasText = true;
            _this.highlightMatchingText(event.target.value);
            _this.filterVisibleSpaces();
            _this.selectFirstSpace();
            _this.flattenSpaces();
        });
    };
    WorkspaceSelectorComponent.prototype.clear = function () {
        var _this = this;
        this.getWorkspaces().then(function () {
            _this.element.nativeElement.value = '';
            _this.hasText = false;
            _this.selectFirstSpace();
            _this.flattenSpaces();
        });
    };
    WorkspaceSelectorComponent.prototype.toggle = function (event) {
        var _this = this;
        this.getWorkspaces().then(function () {
            _this.selectorOpen = !_this.selectorOpen;
            _this.selectFirstSpace();
            _this.flattenSpaces();
        });
    };
    WorkspaceSelectorComponent.prototype.getWorkspaces = function () {
        var _this = this;
        return this.workspaceService.getWorkspaces()
            .then(function (workspaces) { return _this.workspaces = workspaces; })
            .catch(function (error) { return console.error(error); });
    };
    WorkspaceSelectorComponent.prototype.navigateWithArrow = function (keyCode) {
        for (var i = 0; i < this.spaces.length; i++) {
            if (this.spaces[i].selected) {
                if (keyCode === 40) {
                    if (i !== this.spaces.length - 1) {
                        this.spaces[i].selected = false;
                        this.spaces[i + 1].selected = true;
                        return;
                    }
                }
                else {
                    if (i !== 0) {
                        this.spaces[i].selected = false;
                        this.spaces[i - 1].selected = true;
                        return;
                    }
                }
            }
        }
    };
    WorkspaceSelectorComponent.prototype.highlightMatchingText = function (targetValue) {
        for (var _i = 0, _a = this.workspaces; _i < _a.length; _i++) {
            var workspace = _a[_i];
            for (var _b = 0, _c = workspace.spaces; _b < _c.length; _b++) {
                var space = _c[_b];
                if (space.name.toLowerCase().indexOf(targetValue.toLowerCase()) > -1) {
                    space.name = space.name.replace(new RegExp('(' + targetValue + ')', 'gi'), '<span class="highlighted">$1</span>');
                    space.visible = true;
                }
                else {
                    space.visible = false;
                }
            }
        }
    };
    WorkspaceSelectorComponent.prototype.filterVisibleSpaces = function () {
        for (var i = 0; i < this.workspaces.length; i++) {
            this.workspaces[i].spaces = this.workspaces[i].spaces.filter(function (space) {
                return space.visible;
            });
        }
    };
    WorkspaceSelectorComponent.prototype.selectFirstSpace = function () {
        for (var _i = 0, _a = this.workspaces; _i < _a.length; _i++) {
            var workspace = _a[_i];
            for (var _b = 0, _c = workspace.spaces; _b < _c.length; _b++) {
                var space = _c[_b];
                space.selected = false;
            }
        }
        for (var _d = 0, _e = this.workspaces; _d < _e.length; _d++) {
            var workspace = _e[_d];
            for (var _f = 0, _g = workspace.spaces; _f < _g.length; _f++) {
                var space = _g[_f];
                space.selected = true;
                return;
            }
        }
    };
    WorkspaceSelectorComponent.prototype.flattenSpaces = function () {
        this.spaces = [];
        for (var _i = 0, _a = this.workspaces; _i < _a.length; _i++) {
            var workspace = _a[_i];
            for (var _b = 0, _c = workspace.spaces; _b < _c.length; _b++) {
                var space = _c[_b];
                this.spaces.push(space);
            }
        }
    };
    WorkspaceSelectorComponent.prototype.getSelectedSpace = function () {
        return this.spaces.find(function (space) {
            return space.selected == true;
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WorkspaceSelectorComponent.prototype, "onNavigate", void 0);
    __decorate([
        core_1.ViewChild('inputField'), 
        __metadata('design:type', core_1.ElementRef)
    ], WorkspaceSelectorComponent.prototype, "element", void 0);
    WorkspaceSelectorComponent = __decorate([
        core_1.Component({
            selector: 'workspace-selector',
            template: "\n    <li>\n        <i *ngIf=\"selectorOpen && !hasText\" class=\"glyphicon glyphicon-search menu-icon\" (click)=\"toggle()\"></i>\n        <i *ngIf=\"selectorOpen && hasText\" class=\"glyphicon glyphicon-remove menu-icon\" (click)=\"clear()\"></i>\n        <input #inputField *ngIf=\"selectorOpen\" type=\"text\" class=\"search-field\"  (keyup)=\"onKeyUp($event)\">\n\n        <i *ngIf=\"!selectorOpen\" class=\"glyphicon glyphicon-menu-hamburger menu-icon\" (click)=\"toggle()\"></i>\n        <span *ngIf=\"!selectorOpen\" class=\"selector-label\">Choose a workspace</span>\n    </li>   \n    \n    <div *ngIf=\"selectorOpen\" class=\"workspace-flyout\" (window:keydown)=\"onKey($event)\">\n        <div *ngFor=\"let workspace of workspaces\">\n            <h4>\n                <img src=\"{{ workspace.image.thumbnail_link }}\" class=\"header-img\" />\n                <span class=\"ws-header\">{{workspace.name}}</span>\n            </h4>\n            <div *ngFor=\"let space of workspace.spaces\" class=\"item-list\">\n                <span class=\"glyphicon glyphicon-unchecked item-img\" [class.selected-space]=\"space.selected\"></span>\n                <span [innerHTML]=\"space.name\"></span>\n            </div>\n        </div>\n    </div>\n  ",
            directives: [],
            providers: [workspace_service_1.WorkspaceService],
        }), 
        __metadata('design:paramtypes', [workspace_service_1.WorkspaceService])
    ], WorkspaceSelectorComponent);
    return WorkspaceSelectorComponent;
}());
exports.WorkspaceSelectorComponent = WorkspaceSelectorComponent;
//# sourceMappingURL=workspace-selector.component.js.map