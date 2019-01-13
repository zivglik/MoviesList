import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'TitleFormat'})
export class TitleFormatPipe implements PipeTransform {

  transform(value: string): string {
    let res="";
    let isSpace = false;
    

    for(let i=0;i<value.length;i++)
    {

      if(value[i]===" ")
      {
        isSpace=true;
      }
      else
      {
        if(value.charCodeAt(i)>64 && value.charCodeAt(i)<90
        || value.charCodeAt(i)>96 && value.charCodeAt(i)<123
        )
        {
          res += ((isSpace) ? " " : "") + ((isSpace || i==0) ? value[i].toUpperCase() : value[i].toLowerCase());

          isSpace=false;
        }
      }
    }
    
    return res;
  }
}