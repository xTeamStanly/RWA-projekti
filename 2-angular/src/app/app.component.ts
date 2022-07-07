import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent, Event } from '@angular/router';
import { fadeAnimation } from './animations';
import { EntryService } from './services/entry.service';

export enum Routes { Home = 0, Create = 1, About = 2 };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  title = 'Dnevnik';
  RoutesType = Routes;

  constructor(
    private entryService: EntryService,
    private _router?: Router
  ) {}

  currentActiveRoute: Routes = Routes.Home;
  activateRoute(route: Routes) : void {
    this.currentActiveRoute = route;
  }

  ngOnInit(): void {
    this._router?.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationEnd && routerEvent.url) {

        switch(routerEvent.url.trim().toLowerCase().substring(1)) {
          case 'new': this.currentActiveRoute = Routes.Create; break;
          case 'about': this.currentActiveRoute = Routes.About; break;
          default: this.currentActiveRoute = Routes.Home; break;
        }

      }
    });
  }
}
