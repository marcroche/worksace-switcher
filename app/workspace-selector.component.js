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
var WorkspaceSelectorComponent = (function () {
    function WorkspaceSelectorComponent(workspaceService, element) {
        this.workspaceService = workspaceService;
        this.element = element;
        this.selectorOpen = false;
        this.spaces = [];
    }
    WorkspaceSelectorComponent.prototype.onKey = function (event) {
        // up 38 - down - 40 enter - 13
        if (event.keyCode === 38 || event.keyCode === 40) {
            this.navigateWithArrow(event.keyCode);
        }
        console.log(event.keyCode);
    };
    WorkspaceSelectorComponent.prototype.onKeyUp = function (event) {
        var _this = this;
        this.getWorkspaces().then(function () {
            if (event.target.value < 1) {
                return;
            }
            _this.highlightMatchingText(event.target.value);
            _this.filterVisibleSpaces();
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
    WorkspaceSelectorComponent = __decorate([
        core_1.Component({
            selector: 'workspace-selector',
            template: "\n    <li>\n        <i *ngIf=\"selectorOpen\" class=\"glyphicon glyphicon-search menu-icon\" (click)=\"toggle()\"></i>\n        <input *ngIf=\"selectorOpen\" type=\"text\" class=\"search-field\"  (keyup)=\"onKeyUp($event)\">\n\n        <i *ngIf=\"!selectorOpen\" class=\"glyphicon glyphicon-menu-hamburger menu-icon\" (click)=\"toggle()\"></i>\n        <span *ngIf=\"!selectorOpen\" class=\"selector-label\">Choose a workspace</span>\n    </li>   \n    \n    <li class=\"dropdown\" style=\"display: none\">\n        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Workspaces <span class=\"caret\"></span></a>\n        <ul class=\"dropdown-menu\">\n            <li *ngFor=\"let workspace of workspaces\">\n                <a href=\"#/workspace/{{ workspace.id }}\">{{ workspace.name }}</a>\n            </li>\n        </ul>\n    </li>\n    <router-outlet></router-outlet>\n\n    <div *ngIf=\"selectorOpen\" class=\"workspace-flyout\" (window:keydown)=\"onKey($event)\">\n        <div *ngFor=\"let workspace of workspaces\">\n            <h4>\n                <img src=\"{{ workspace.image.thumbnail_link }}\" class=\"header-img\" />\n                <span class=\"ws-header\">{{workspace.name}}</span>\n            </h4>\n            <div *ngFor=\"let space of workspace.spaces\" class=\"item-list\">\n                <span class=\"glyphicon glyphicon-unchecked item-img\" [class.selected-space]=\"space.selected\"></span>\n                <span [innerHTML]=\"space.name\"></span>\n            </div>\n        </div>\n    </div>\n  ",
            providers: [workspace_service_1.WorkspaceService],
        }), 
        __metadata('design:paramtypes', [workspace_service_1.WorkspaceService, core_1.ElementRef])
    ], WorkspaceSelectorComponent);
    return WorkspaceSelectorComponent;
}());
exports.WorkspaceSelectorComponent = WorkspaceSelectorComponent;
//# sourceMappingURL=workspace-selector.component.js.map