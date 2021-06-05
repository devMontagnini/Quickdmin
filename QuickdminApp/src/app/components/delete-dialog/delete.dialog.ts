import { Observable } from "rxjs";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SearchResultItem } from "../../interfaces/search-result-item.model";

@Component({
  templateUrl: 'delete.dialog.html',
  styleUrls: ['./delete.dialog.sass'],
})
export class DeleteDialog {

  isLoading = false;
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      entity: SearchResultItem, 
      deleteAction: () => Observable<any> 
    }
  ) { }

  async confirmDelete() {
    this.isLoading = true;
    this.errorMessage = '';
    this.data.deleteAction()
      .subscribe(
        (success) => this.dialogRef.close(true),
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Ocorreu um erro, tente novamente.';
        });
  }

}