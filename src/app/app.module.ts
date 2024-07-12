
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { DropdownModule } from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './core/interceptor';
import { QuestionsComponent } from './pages/questions/questions.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { CheckboxModule } from 'primeng/checkbox';
import { QuestionaireComponent } from './pages/questionaire/questionaire.component';@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionsComponent,
    AdminPanelComponent,
    QuestionaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    InputGroupModule,
    DropdownModule,
    TableModule,
    InputSwitchModule,
    CheckboxModule
  ],
  providers: [provideClientHydration(),provideHttpClient(),
  provideHttpClient(withInterceptors([AuthInterceptor])) ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
