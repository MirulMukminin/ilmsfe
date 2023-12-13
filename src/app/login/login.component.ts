import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from '../app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 })),
      ]),
      // transition(':leave', [   // :leave is alias to '* => void'
      //   animate(1000, style({opacity:0}))
      // ])
    ]),
  ],
})
export class LoginComponent implements OnInit {
  currentParagraph = 0;
  currentImage = 0;

  paragraphs: any[] = [
    {
      desc: 'Penyediaan Cop Syarikat bagi pengesahan Tiket Kerja Jambatan Timbang (Weighbridge)',
    },
    {
      desc: '(Weighbridge) Penyediaan Cop Syarikat bagi pengesahan Tiket Kerja Jambatan Timbang',
    },
    {
      desc: 'Cop Syarikat bagi pengesahan Tiket Kerja Jambatan Timbang (Weighbridge)',
    },
  ];

  images: any[] = [
    // { src: "./assets/images/Group 48241.png" },
    { src: './assets/images/main banner.png' },
    { src: './assets/images/Group 48242.jpeg' },
  ];

  // loggedIn: boolean;
  username: string;
  password: string;
  remember: boolean;
  invalidUsername: boolean;
  invalidPassword: boolean;

  Previousparagraph() {
    const previous = this.currentParagraph - 1;
    this.currentParagraph =
      previous < 0 ? this.paragraphs.length - 1 : previous;
    //console.log("previous clicked, new current text is: ", this.currentParagraph);
  }

  Nextparagraph() {
    const next = this.currentParagraph + 1;
    this.currentParagraph = next === this.paragraphs.length ? 0 : next;
    //console.log("next clicked, new current text is: ", this.currentParagraph);
  }

  PreviousImage() {
    const previous = this.currentImage - 1;
    this.currentImage = previous < 0 ? this.images.length - 1 : previous;
    //console.log("previous clicked, new current Image is: ", this.currentImage);
  }

  NextImage() {
    const next = this.currentImage + 1;
    this.currentImage = next === this.images.length ? 0 : next;
    //console.log("next clicked, new current Image is: ", this.currentImage);
  }

  constructor(
    private appService: AppService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(document.referrer);
    this.Repeat();
  }

  Repeat() {
    setTimeout(() => {
      this.Nextparagraph();
      this.NextImage();
      this.Repeat();
    }, 8000);
  }

  private login(
    login: string,
    password: string
  ): Promise<{ access_token: string }> {
    // console.log("masuk login");

    return this.appService.myApp.login(login, password);
  }

  public showPassword: boolean;

  private auth(formData: any) {
    // console.log("masuk");

    this.login(formData.username, formData.password)
      .then((result) => {
        // console.log(result['expires_in']);

        this.rememberMe(formData.remember, formData.password);
        this.storage.clear('token');
        this.storage.clear('username');
        this.storage.store('token', result);
        // this.storage.store('token', 'DummyToken');
        this.storage.store('username', formData.username);
        // this.appService.sessionTimeout(result['expires_in']);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        this.invalidInput();
        console.error(err);
      });
  }

  onSubmit(loginForm: NgForm): void {
    const form = loginForm.value;

    // console.log(form);

    if (form.username && form.password) {
      this.auth(form);
    } else {
      this.invalidInput();
    }
  }

  invalidInput() {
    this.invalidUsername = true;
    this.invalidPassword = true;
  }

  clearInvalid() {
    this.invalidUsername = false;
    this.invalidPassword = false;
  }

  rememberMe(remember: boolean, password: string) {
    if (remember) {
      this.storage.clear('remember');
      this.storage.clear('key');
      this.storage.store('remember', remember);
      this.storage.store('key', password);
    }
  }

  public onKeyUpUsername(uname: string): void {
    this.clearInvalid();

    const user = this.storage.retrieve('username');

    if (uname == user) {
      this.password = this.storage.retrieve('key');
    }
  }
}
