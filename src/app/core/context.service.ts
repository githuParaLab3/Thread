import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private activeContextSource = new BehaviorSubject<any>(null);
  activeContext$ = this.activeContextSource.asObservable();

  setContext(data: any) {
    this.activeContextSource.next(data);
  }

  clearContext() {
    this.activeContextSource.next(null);
  }
}