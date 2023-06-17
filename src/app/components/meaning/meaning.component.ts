import { Component, Input } from '@angular/core';
import { IMeanings } from 'src/app/models/IWord';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-meaning',
  templateUrl: './meaning.component.html',
  styleUrls: ['./meaning.component.scss']
})
export class MeaningComponent {
  @Input() meaning:IMeanings ={} as IMeanings
  constructor(private dataService: DataService) {}

  fetchDataFromServer(word:string) {
    this.dataService.fetchDataFromServer(word)
  }
}
