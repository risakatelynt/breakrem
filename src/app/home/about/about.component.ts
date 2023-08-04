import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  loading = true;
  images = ['./assets/images/balance.jpg', './assets/images/break.jpg', './assets/images/layout.jpg',
    './assets/images/ontrack.jpg', './assets/images/feedback.jpg'];
    
  ngOnInit() {
    this.preloadGifs();
    this.timeout();
  }

  preloadGifs() {
    this.images.forEach((gifUrl) => {
      const img = new Image();
      img.src = gifUrl;
    });
  }

  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
