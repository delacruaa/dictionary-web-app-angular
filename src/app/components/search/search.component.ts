import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public inputValue: string = '';
  public notEmpty= false;
  constructor(private dataService:DataService) {}
  fetchData() {
    if (this.inputValue) {
      this.notEmpty = false;
      this.dataService.fetchDataFromServer(this.inputValue)
    } else {
      this.notEmpty = true;
    }
    this.inputValue = '';
  }
  clearError(): void {
    this.notEmpty = false;
  }
}
