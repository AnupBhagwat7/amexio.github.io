/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by pratik on 28/12/17.
*/

import {
  AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild,
} from '@angular/core';
import {AmexioTemplateDirective} from './carousel.template.directive';
import {AmexioTemplateWrapperDirective} from './carousel.wrapper.template.directive';

@Component({
  selector: 'amexio-carousel', template: `
    <h4>{{header}}</h4>
    <div class="tabwrapper">
      <div class="carouselnavigation float-left" (click)="previous()">
        <amexio-pane-icon key="carousel_previous"></amexio-pane-icon>
      </div>
      <div class="carouselnavigation float-right" (click)="next()">
        <amexio-pane-icon key="carousel_next"></amexio-pane-icon>
      </div>
      <ul #tab class="tab">
        <li class="tablistitems" *ngFor="let item of data" (mouseover)="stopTimeInterval($event)"
            (mouseleave)="startTimeInterval($event)">
          <ng-template [amexioTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
        </li>
      </ul>
    </div>
  `,
})

export class AmexioCarouselComponent implements  AfterContentInit, OnInit {

    /*
Properties
name : header
datatype : string
version : 4.0 onwards
default :
description : User can bind title for accordion tab.
*/
  @Input() header: string;

   /*
  @Input() mode: 'single' | 'multiple';
  */

/*
Properties
name : data
datatype : any
version : 4.0 onwards
default :
description : Data Containing Image Path, Information and Video URL Refer the DataSource Tab
*/
  @Input() data: any;

  /*
  Properties
name : shuffle-interval
datatype : number
version : 4.0 onwards
default :
description : Time interval for shuffling images
*/
  @Input('shuffle-interval') shuffleinterval: number;

  timeInterval: any;

  public itemTemplate: TemplateRef<any>;

  @ContentChildren(AmexioTemplateDirective) templates: QueryList<any>;

  @ViewChild('tab', {read: ElementRef}) public tabs: ElementRef;

  constructor() {
  }

  ngOnInit() {
   this.startTimeInterval();
  }

  ngAfterContentInit() {
    this.templates.forEach((item: any) => {
        this.itemTemplate = item.template;
    });
  }

  scrollData() {
  }

  next() {
    const nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;
  }

  previous() {
    const prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;
  }

  shuffle() {

  }

  startTimeInterval() {
    if (this.shuffleinterval != null) {
      this.timeInterval = setInterval(() => {
        const carouselItemPosix = this.tabs.nativeElement;
        if (!((carouselItemPosix.scrollWidth - carouselItemPosix.offsetWidth - carouselItemPosix.scrollLeft ) <= 0)) {
          // go next
          carouselItemPosix.scrollLeft = carouselItemPosix.scrollLeft + 200;
        } else if (carouselItemPosix.scrollLeft > 0) {
          // go previous
          carouselItemPosix.scrollLeft = carouselItemPosix.scrollLeft - 200;
        }
      }, this.shuffleinterval);
    }
  }

  stopTimeInterval() {
    clearTimeout(this.timeInterval);
  }

}
