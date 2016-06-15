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
    function WorkspaceSelectorComponent(workspaceService) {
        this.workspaceService = workspaceService;
    }
    WorkspaceSelectorComponent.prototype.ngOnInit = function () {
        this.getWorkspaces();
    };
    WorkspaceSelectorComponent.prototype.getWorkspaces = function () {
        var _this = this;
        this.workspaceService.getWorkspaces()
            .then(function (workspaces) { return _this.workspaces = workspaces; })
            .catch(function (error) { return console.error(error); });
    };
    WorkspaceSelectorComponent = __decorate([
        core_1.Component({
            selector: 'workspace-selector',
            template: "\n    <li class=\"dropdown\">\n        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Workspaces <span class=\"caret\"></span></a>\n        <ul class=\"dropdown-menu\">\n            <li *ngFor=\"let workspace of workspaces\">\n                <a href=\"#/workspace/{{ workspace.id }}\">{{ workspace.name }}</a>\n            </li>\n        </ul>\n    </li>\n    <router-outlet></router-outlet>\n  ",
            providers: [workspace_service_1.WorkspaceService],
        }), 
        __metadata('design:paramtypes', [workspace_service_1.WorkspaceService])
    ], WorkspaceSelectorComponent);
    return WorkspaceSelectorComponent;
}());
exports.WorkspaceSelectorComponent = WorkspaceSelectorComponent;
//# sourceMappingURL=workspace-selector.component.js.map