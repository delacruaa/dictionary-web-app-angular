import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  options= ['Serif', 'Sans-Serif', 'Mono'];
  @Output() dataEvent = new EventEmitter<string>();
  public selectedOption = 'Serif';
  public isOpen = false;
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    document.body.style.fontFamily="Inter,serif";
  }

  onSelect(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.selectedToParent();
    if(this.selectedOption=='Sans-Serif'){
      document.body.style.fontFamily="Inconsolata,sans-serif";
    }
    if(this.selectedOption=='Serif'){
      document.body.style.fontFamily="Inter,serif";
    }
    if(this.selectedOption=='Mono'){
      document.body.style.fontFamily="Lora,monospase";
    }
  }
  onToggle() {
    this.isOpen = !this.isOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.isOpen = false;
    }
  }
  selectedToParent(): void {
    this.dataEvent.emit(this.selectedOption);
  }
}
