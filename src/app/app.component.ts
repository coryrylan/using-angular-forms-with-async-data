import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService, User } from './user.service';

@Component({
  standalone: true,
  providers: [UserService],
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
