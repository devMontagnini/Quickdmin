import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.sass'],
})
export class PageTitleComponent {
  @Input('title') title: string = '';
}