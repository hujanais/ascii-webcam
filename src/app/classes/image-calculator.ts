const cell_width = 8;
const cell_height = 8;
const asciiSet = `_.,-=+:;cba!?0123456789$W#@N`.split('');

export class ImageCalculator {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.ctx = context;
    this.width = width;
    this.height = height;
  }

  public calculateAsciiImage(image: HTMLVideoElement) {
    // blt the image to the canvas so we can read the values back.
    this.ctx.drawImage(image, 0, 0, this.width, this.height);
    var imgd = this.ctx.getImageData(0, 0, this.width, this.height);
    const pix = imgd.data;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Loop over each pixel and invert the color.
    const cols = this.width / cell_width;
    const rows = this.height / cell_height;

    this.ctx.font = '8px';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'green';

    let grayscale = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grayscale = this.averageIntensity(pix, col, row);
        const ascii = this.getAscii(grayscale);
        this.ctx.fillText(ascii, col * cell_width + 4, row * cell_height + 8);
      }
    }
  }

  private getAscii(grayScale: number): string {
    let n = asciiSet.length;
    let index = Math.floor((grayScale / 256) * n);
    return asciiSet[index];
  }

  private averageIntensity(
    pix: Uint8ClampedArray,
    col: number,
    row: number
  ): number {
    let grayscale = 0;
    let x0 = row * cell_height * this.width * 4;
    x0 += col * cell_width * 4;

    // average the grayscale over the cell.
    let n = 0;
    for (let y = 0; y < cell_height; y++) {
      x0 += this.width * 4 * y;
      for (let x = 0; x < cell_width * 4; x += 4) {
        grayscale += pix[x0 + x] + pix[x0 + x + 1] + pix[x0 + x + 2];
        n += 3;
      }
    }
    return grayscale / n;
  }
}
