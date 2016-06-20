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
var router_1 = require('@angular/router');
var WorkspaceDetailComponent = (function () {
    function WorkspaceDetailComponent(workspaceService) {
        this.workspaceService = workspaceService;
    }
    WorkspaceDetailComponent.prototype.routerOnActivate = function (routeSegment) {
        this.getWorkspace(Number(routeSegment.getParam('id')));
    };
    WorkspaceDetailComponent.prototype.getWorkspace = function (id) {
        var _this = this;
        this.workspaceService.getWorkspaces().then(function (workspaces) { return _this.workspaces = workspaces; })
            .then(function () {
            for (var _i = 0, _a = _this.workspaces; _i < _a.length; _i++) {
                var workspace = _a[_i];
                for (var _b = 0, _c = workspace.spaces; _b < _c.length; _b++) {
                    var space = _c[_b];
                    if (space.id === id) {
                        _this.space = space;
                        return;
                    }
                }
            }
        })
            .catch(function (error) { return console.error(error); });
    };
    WorkspaceDetailComponent = __decorate([
        core_1.Component({
            selector: 'workspace-detail',
            template: "\n    <div class=\"container\" *ngIf=\"space\">\n      <div class=\"jumbotron\">\n        <h2>{{space.name}}</h2>\n      </div>\n    </div>\n    <router-outlet></router-outlet>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [workspace_service_1.WorkspaceService],
        }), 
        __metadata('design:paramtypes', [workspace_service_1.WorkspaceService])
    ], WorkspaceDetailComponent);
    return WorkspaceDetailComponent;
}());
exports.WorkspaceDetailComponent = WorkspaceDetailComponent;
//# sourceMappingURL=workspace-detail.component.js.map