import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityRoutingModule } from './entities/entity-routing.module';
import { ApplicationConfigService } from './core/config/application-config.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BASE_API_URL } from './app.constants';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntityRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    applicationConfigService: ApplicationConfigService,
  ) {
    applicationConfigService.setEndpointPrefix(BASE_API_URL)
  }
}
