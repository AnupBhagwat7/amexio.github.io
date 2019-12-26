import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { AmexioImageComponent } from '../../../standard/media/image/image.component';
import { AmexioVideoPlayerComponent } from '../../../standard/media/video-player/video.player.component';

@Component({
  selector: 'amexio-viewport-background',
  templateUrl: './viewport.background.component.html',
})
export class ViewportBackgroundComponent implements AfterContentInit, OnInit {

  @ContentChild(AmexioImageComponent, /* TODO: add static flag */ { static: true}) imageTemplate: AmexioImageComponent;
  @ContentChild(AmexioVideoPlayerComponent, /* TODO: add static flag */ { static: true}) videoTemplate: AmexioVideoPlayerComponent;

  bgCss: string;
  imagePath: string;
  videoPath: string;

  @Input('background-color') backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // IMAGE
    if (this.imageTemplate) {
      this.imagePath = this.imageTemplate.path;
      this.bgCss = 'bgCss' + window.crypto.getRandomValues(new Uint32Array(1))[0] + 'background';
    }

    // VIDEO
    if (this.videoTemplate) {
      this.videoPath = this.videoTemplate.path;
    }
  }
}