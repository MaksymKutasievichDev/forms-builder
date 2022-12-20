import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  @Input() formElementsList: string[] = [
    'Input',
    'Textarea',
    'Button',
    'Checkbox',
    'Select'
  ];

  openedOnSmallScreen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeOpenOnSmallScreenStatus(){
    this.openedOnSmallScreen = !this.openedOnSmallScreen
  }

}
