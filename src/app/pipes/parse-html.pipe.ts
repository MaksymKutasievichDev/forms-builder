import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'parseHtml'
})
export class ParseHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value:string):SafeHtml {
    switch (value) {
      case 'Input':
        return this.sanitizer.bypassSecurityTrustHtml('<mat-form-field appearance="fill" class="isFullWidth"><input class="isFullWidth" placeholder="Your input" matInput></mat-form-field>')
      case 'Button':
        return this.sanitizer.bypassSecurityTrustHtml('<button mat-raised-button color="primary" class="isFullWidth">Button</button>')
      case 'Textarea':
        return this.sanitizer.bypassSecurityTrustHtml('<mat-form-field appearance="fill" class="isFullWidth"><textarea matInput class="isFullWidth"></textarea></mat-form-field>')
      case 'Checkbox':
        return this.sanitizer.bypassSecurityTrustHtml("<input type='checkbox'>")
      case 'Select':
        return this.sanitizer.bypassSecurityTrustHtml('<mat-form-field appearance="fill" class="isFullWidth"><mat-select class="isFullWidth"><mat-option value="">First option</mat-option><mat-option value="">Second option</mat-option></mat-select></mat-form-field>')
      default:
        return 'default value'
    }
  }

}
