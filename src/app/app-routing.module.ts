import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { TreesInRadiusMapComponent } from "./trees-in-radius-map/trees-in-radius-map.component";

const routes: Routes = [
    { path: "", redirectTo: "/trees", pathMatch: "full" },
    { path: "trees", component: TreesInRadiusMapComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
