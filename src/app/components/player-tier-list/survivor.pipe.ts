import { Pipe, PipeTransform } from "@angular/core";
import { Survivor } from "./survivor/survivor";

@Pipe({
    name: 'survivor'
  })
  export class SurvivorPipe implements PipeTransform {
  
    transform(value: Survivor[], ...args: unknown[]): Survivor[] {
      if (!value)
        return value;
  
        return value.sort((a: Survivor, b: Survivor) => a.team - b.team || b.rarity - a.rarity || b.avg - a.avg);
    }
  }