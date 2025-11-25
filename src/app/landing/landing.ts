import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
})
export class Landing implements AfterViewInit {

  ngAfterViewInit() {
    // Scroll Reveal للـ Features Cards
    window.addEventListener('scroll', () => {
      const cards = document.querySelectorAll('.feature-card');
      const triggerBottom = window.innerHeight * 0.85;

      cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
          card.classList.add('show');
        }
      });
    });
  }

}
