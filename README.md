[Try It!](https://ascii-webcam-hujanais.vercel.app/)

## Overview

While browsing around YouTube, I was recommended to the following video.  
[Coding Challenge: Image To Ascii](https://www.youtube.com/watch?v=55iwMYv8tGI)
The moment I saw the thumbnail, I knew what it was about. I then thought to myself, can I build something like that? To be honest, I did watch a bit of the video to get some ideas how it is done and once I got the gist of it, I started my weekend hackathon.

## The goal

What I wanted is to build a simple webpage that I can capture live feed from my webcam and to display an ascii representation of the live feed. I will definitely use green ascii per the Matrix! Initially I was going to just use vanilla javascript and html but then I quickly decided to just use Angular to use Typescript instead.

## Challenges

1.  Frankly, I poked around the internet a bit to get the live feed from my webcam working and then I was quickly able to do pixel manipulation on the canvas.
2.  Then I copied the ascii mapping from the YouTube video I mentioned above. Essentially, it is just an array of characters for the grayscale intensity.
3.  I quickly realized that I cannot just simply convert 1 pixel to a character. Each character is cell of several pixels wide. So here is my solution. It is quick and dirty but effective. My original image is 640 x 480 and for the output image, I scaled it down to 80 x 60 cells. This is because each of the new cell is based on an 8x8 pixels square from the original image. The new cell which is 8x8 is large enough to accomodate a character.
4.  The final piece of the puzzle that took me the longer time is to average the intensity of the each 8x8 cell from the original image and then use the intensity to look up the ascii map.

## Shortcuts

1. The algorithm of averaging the RGB values may not give the best image quality but works well enough.
2. I used a very naive Javascript timer to process the image once every 250ms. I think for an adaptive and fastest solution, I could use RXJS instead but I didn't bother.
3. Surely the code was not properly tested for bugs, accuracy and edge cases.

## Conclusion

This is a quick and dirty mini-hackathon project to scratch an itch and I think it did do the trick. Thanks for reading.
