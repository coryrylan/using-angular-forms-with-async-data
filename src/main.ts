import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService, User } from './user.service';

@Component({
  providers: [UserService],
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
<form *ngIf="user | async; else loading" [formGroup]="form" (ngSubmit)="submit()">
  <label for="firstname">First Name</label>
  <input id="firstname" formControlName="firstName" />
  <div *ngIf="form.controls['firstName'].errors?.['required'] && form.controls['firstName'].touched" class="error">
    *Required
  </div>

  <label for="lastname">Last Name</label>
  <input id="lastname" formControlName="lastName" />
  <div *ngIf="form.controls['lastName'].errors?.['required'] && form.controls['lastName'].touched" class="error">
    *Required
  </div>

  <label for="about">About</label>
  <textarea id="about" formControlName="about"></textarea>

  <button [disabled]="!form.valid">Save Profile</button>
</form>

<ng-template #loading>
  Loading User...
</ng-template>
  `
})
export class App {
  form!: FormGroup;
  user!: Observable<User>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      about: []
    });

    this.user = this.userService.loadUser().pipe(
      tap(user => this.form.patchValue(user))
    );
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}

bootstrapApplication(App);
