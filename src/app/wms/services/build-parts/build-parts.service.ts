import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BuildParts} from '../../interfaces/build-parts/build-parts';

@Injectable({
  providedIn: 'root'
})


export class BuildPartsService {

  buildPartsForm: BuildParts 
  
  setBuildPartsFormValue(data: BuildParts) {
    this.buildPartsForm = data;
  }

  getBuildPartsFormValue(){
    return this.buildPartsForm;
  }


  private previousUrl: string = '';
  private currentUrl: string = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
  
}
