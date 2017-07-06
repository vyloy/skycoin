import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';

@Pipe({
    name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizationService) {
    }

    transform(url): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}
