import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../Types';

@Injectable({
  providedIn: "root",
})
export class UserService {
  isUserVerified: WritableSignal<boolean> = signal(false);

  constructor() {}
}
