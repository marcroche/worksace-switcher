import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
	transform(text, phrase) {
        console.log(text);
        return text;   
    }
}