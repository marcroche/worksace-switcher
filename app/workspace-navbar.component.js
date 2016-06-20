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
var workspace_selector_component_1 = require('./workspace-selector.component');
var router_1 = require('@angular/router');
var WorkspaceNavbarComponent = (function () {
    function WorkspaceNavbarComponent(router) {
        this.router = router;
    }
    WorkspaceNavbarComponent.prototype.onNavigate = function (url) {
        this.router.navigateByUrl(url);
    };
    WorkspaceNavbarComponent = __decorate([
        core_1.Component({
            selector: 'workspace-navbar',
            template: "\n    <nav class=\"navbar navbar-default navbar-fixed-top\">\n      <div class=\"container\">\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n            <workspace-selector (onNavigate)=\"onNavigate($event)\" class=\"nav navbar-nav\"></workspace-selector>\n          </ul>\n        </div>\n      </div>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
            directives: [workspace_selector_component_1.WorkspaceSelectorComponent]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], WorkspaceNavbarComponent);
    return WorkspaceNavbarComponent;
}());
exports.WorkspaceNavbarComponent = WorkspaceNavbarComponent;
//# sourceMappingURL=workspace-navbar.component.js.map