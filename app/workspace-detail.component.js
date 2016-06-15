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
var WorkspaceDetailComponent = (function () {
    function WorkspaceDetailComponent(workspaceService, zone) {
        this.workspaceService = workspaceService;
        this.zone = zone;
        //Angular 2 Router is not behaving as documented.. researching further
        window.onhashchange = function () {
            var _this = this;
            zone.run(function () {
                _this.getWorkspace(_this.parseRoute());
            });
        }.bind(this);
        this.getWorkspace(this.parseRoute());
    }
    WorkspaceDetailComponent.prototype.getWorkspace = function (id) {
        var _this = this;
        this.workspaceService.getWorkspaces().then(function (workspaces) { return _this.workspaces = workspaces; })
            .then(function () { return _this.workspace = _this.workspaces.find(function (workspace) {
            return workspace.id === id;
        }); })
            .catch(function (error) { return console.error(error); });
    };
    WorkspaceDetailComponent.prototype.parseRoute = function () {
        if (window.location.hash) {
            var parts = window.location.hash.split('/');
            if (parts && parts.length === 3 && parts[1] === 'workspace') {
                return Number(parts[2]);
            }
        }
        return null;
    };
    WorkspaceDetailComponent = __decorate([
        core_1.Component({
            selector: 'workspace-detail',
            template: "\n    <div class=\"container\" *ngIf=\"workspace\">\n      <div class=\"jumbotron\">\n        <h2>{{workspace.name}}</h2>\n        <div><label>Spaces</label></div>\n        <li *ngFor=\"let space of workspace.spaces\">{{ space.name }}</li>\n      </div>\n    </div>\n    ",
            providers: [workspace_service_1.WorkspaceService]
        }), 
        __metadata('design:paramtypes', [workspace_service_1.WorkspaceService, core_1.NgZone])
    ], WorkspaceDetailComponent);
    return WorkspaceDetailComponent;
}());
exports.WorkspaceDetailComponent = WorkspaceDetailComponent;
//# sourceMappingURL=workspace-detail.component.js.map