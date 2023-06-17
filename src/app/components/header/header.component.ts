import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  public isDark = false
  
  ngOnInit(): void {
 
    if(localStorage.getItem('theme')===null) {
      localStorage.setItem('theme', JSON.stringify(this.isDark))
      document.body.setAttribute('data-theme' , 'light')
    }else {
      //@ts-ignore
      this.isDark= JSON.parse(localStorage.getItem('theme'))
      document.body.setAttribute('data-theme' , this.isDark? 'dark': 'light')
    }
    
  }
  themeSwitcher () {
    this.isDark = !this.isDark
    document.body.setAttribute('data-theme' , this.isDark? 'dark': 'light')
    localStorage.setItem('theme', JSON.stringify(this.isDark))
  }
}
