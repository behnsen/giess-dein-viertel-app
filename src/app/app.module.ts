import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { registerElement } from "@nativescript/angular/element-registry";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TreesInRadiusMapComponent } from './trees-in-radius-map/trees-in-radius-map.component';
import { TreeDetailComponent } from './tree-detail/tree-detail.component';

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        AppComponent,
        TreesInRadiusMapComponent,
        TreeDetailComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
