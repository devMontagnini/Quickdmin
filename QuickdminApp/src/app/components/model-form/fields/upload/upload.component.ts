import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Component, forwardRef, Input } from "@angular/core";
import { ModelFormControl } from "../../../../shared/helpers/model-form-control.helper";
import { IImageField } from "../../../../shared/interfaces/fields/image-field.interface";

@Component({
  selector: 'mf-upload',
  templateUrl: './upload.component.html',
  styleUrls: [
    '../common/styles/mat-form-field.sass',
    './upload.component.sass',
  ],
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadComponent),
  }],
})
export class UploadComponent {

  @Input() control!: ModelFormControl;
  
  loadingFile: boolean = false;
  selectedFile?: {
    source: string | ArrayBuffer | null,
    infos: { type: string, name: string },
  };

  isImage(type: string): boolean {
    return ['image/gif', 'image/jpeg', 'image/png'].includes(type);
  }

  getImageContent(): string | ArrayBuffer | null {
    return this.selectedFile?.source || this.control.field.value;
  }

  getFileName(): string {
    return this.selectedFile?.infos.name || (this.control.field as IImageField).filename;
  }

  getAccepts(): string[] {
    return (this.control.field as IImageField).accepts;
  }

  getContentType(): 'image' | 'document' | null {
    if (this.selectedFile) {
      return this.isImage(this.selectedFile.infos.type) ? 'image' : 'document';
    }

    if (this.control.field.value) {
      return this.isImage(this.control.field.value) ? 'image' : 'document';
    }

    return null;
  }

  selectFile(event: Event) {
    const file = (event.target as any).files[0];
    if (!file) {
      return;
    }

    this.loadingFile = true;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.loadingFile = false;
      this.selectedFile = {
        source: fileReader.result,
        infos: { name: file.name, type: file.type },
      };
    };
  }
  
}