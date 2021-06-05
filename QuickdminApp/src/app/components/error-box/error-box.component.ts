import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchResultItem } from "src/app/interfaces/search-result-item.model";

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.sass'],
})
export class ErrorBoxComponent {

  @Input('errorMessage') errorMessage: string = '';
  @Output('onRetry') onRetry = new EventEmitter<void>();

}