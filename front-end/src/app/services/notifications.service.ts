import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor( private snackBar: MatSnackBar) { }

  ShowMessage(message: string): void{
    this.snackBar.open(message, 'fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }
}
