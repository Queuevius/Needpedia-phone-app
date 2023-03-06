import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-youtube-player',
    template: '<div #youtubePlayer></div>',
  })
  export class YoutubePlayerComponent {
  constructor(private elementRef: ElementRef) {
    (window as any).onYouTubeIframeAPIReady = () => {
      new (window as any).YT.Player(this.elementRef.nativeElement.querySelector('#youtubePlayer'), {
        videoId: 'WbEWdZSAxTw',
        playerVars: {
          modestbranding: 1,
        },
      });
    };
  }
  }