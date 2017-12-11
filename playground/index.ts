/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { FsMaterialModule } from '@firestitch/material';
import { FsFormModule }  from '@firestitch/form';

@Component({
  selector: 'app-root',
  styleUrls: [
    'styles.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html'
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    FsFormModule,     
    FormsModule,
    FsMaterialModule
   ]
})
class AppModule {}


platformBrowserDynamic().bootstrapModule(AppModule);
