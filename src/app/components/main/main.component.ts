import { Component, OnInit} from '@angular/core';
import { IWord } from 'src/app/models/IWord';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  wordMeaning:IWord = {} as IWord
  pronounce:string | null=''
  audioFile:string | null=''
  loading = false;
  error = false
 
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getSearchData().subscribe(data=> {
      this.wordMeaning=data
      if(this.wordMeaning.word) {
        this.pronounce= this.getPhonetic(data)
        this.audioFile = this.getAudioUrl(data)
      }
    })
    this.dataService.getLoadingStatus().subscribe((loading) => {
      this.loading = loading;
    });
    this.dataService.getErrorMessage().subscribe((error) => {
      this.error = error;
    });
  }

  getAudioUrl = (data:IWord) => {
    const audio = data.phonetics.find(
      (p) => p.audio != null && p.audio.trim().length > 0
    );

    if (audio == null) {
      return null;
    }

    return audio.audio!;
  };

  getPhonetic = (data:IWord) => {
    const text = data.phonetics.find(
      (p) => p.text != null && p.text.trim().length > 0
    );

    if (text == null) {
      return null;
    }

    return text.text!;
  };
  playAudio(){
    let audio = new Audio(this.audioFile!);
    console.log(this.audioFile!)
    audio.load();
    audio.play();
  }
}


