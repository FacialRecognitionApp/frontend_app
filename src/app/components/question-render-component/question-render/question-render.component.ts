import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/home/home.page';

@Component({
    selector: 'question-render',
    templateUrl: './question-render.component.html',
    styleUrls: ['./question-render.component.scss'],
})
export class QuestionRenderComponent implements OnInit {
    @Input() question: Question;

    constructor() { }
  
    ngOnInit() {

    }
  

}
