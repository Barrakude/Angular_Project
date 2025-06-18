import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value.toLowerCase()){
      case 'todo':
        return 'Da fare';
      case 'doing':
        return 'In lavorazione';
      case 'done':
        return 'Completato';
      default:
        return value;
    }
  }

}
