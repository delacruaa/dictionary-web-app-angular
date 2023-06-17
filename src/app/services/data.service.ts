import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, throwError } from 'rxjs';
import { IWord } from '../models/IWord';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {}
  public wordMeaning = new BehaviorSubject<IWord>({} as IWord);
  private loading = new BehaviorSubject<boolean>(false);

  private errorMessage = new BehaviorSubject<boolean>(false);
  fetchDataFromServer(word: string) {
    this.loading.next(true);
    this.errorMessage.next(false)
    return this.httpClient
      .get<IWord[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loading.next(false);
        })
      )
      .subscribe(
        (data) => {
          console.log(data)
          this.wordMeaning.next(data[0]);
        },
        (error) => {
          console.log(error)
          this.errorMessage.next(error);
        }
      );
  }
  getSearchData() {
    return this.wordMeaning.asObservable();
  }
  getLoadingStatus() {
    return this.loading.asObservable();
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }
  public handleError(error: HttpErrorResponse) {
    let errorStatus=false;
    if(error) {
      errorStatus=true
    }
    return throwError(() => {
      return errorStatus;
    });
  }
}
