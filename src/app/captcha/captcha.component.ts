import { Component } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [RecaptchaModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent {
  secretkey: any = "6LcA_mcqAAAAAM1HePepogqD6GeyNusThOpDEVp3";
  excecuteRecaptcha(token: any) {
    console.log(token)
  }
}
