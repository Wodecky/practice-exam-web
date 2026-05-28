import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppBarComponent } from './app-bar/app-bar.component';
import { HeroComponent } from './hero/hero.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ExamsComponent } from './exams/exams.component';
import { TryQuestionComponent } from './try-question/try-question.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-landing',
  imports: [
    AppBarComponent,
    HeroComponent,
    HowItWorksComponent,
    ExamsComponent,
    TryQuestionComponent,
    NewsletterComponent,
    FooterComponent,
  ],
  template: `
    <app-bar />
    <main>
      <app-hero id="top" />
      <app-how-it-works id="how" />
      <app-exams id="exams" />
      <app-try-question id="try" />
      <app-newsletter />
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
