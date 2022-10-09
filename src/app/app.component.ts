import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ImageCalculator } from './classes/image-calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('videoElement') videoElem!: ElementRef;
  @ViewChild('picture') picture!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;

  width = 640;
  height = 480;
  cell_width = 8;
  cell_height = 8;

  private timerId: any;
  private stream: MediaStream | undefined = undefined;
  private imageCalculator: ImageCalculator | undefined;

  public hasCamera: boolean = false;
  public goOnAir: boolean = false;

  ngOnInit() {}

  async ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    this.imageCalculator = new ImageCalculator(ctx, this.width, this.height);
    this.picture?.nativeElement.setAttribute('crossOrigin', '');

    // test for webcam.
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      this.hasCamera = true;
    } catch (ex) {
      this.hasCamera = false;
    }
  }

  public async toggleGoLive() {
    if (!this.goOnAir) {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (this.stream) {
        this.goOnAir = true;
        this.videoElem.nativeElement.srcObject = this.stream;
        this.videoElem.nativeElement.play();
        this.timerId = setInterval(() => {
          this.processImage();
        }, 250);
      }
    } else {
      this.goOnAir = false;
      clearInterval(this.timerId);
      this.videoElem.nativeElement.pause();
    }
  }

  public processImage(): void {
    const img = this.videoElem.nativeElement;
    // const img = this.picture.nativeElement;
    this.imageCalculator?.calculateAsciiImage(img);
  }
}
