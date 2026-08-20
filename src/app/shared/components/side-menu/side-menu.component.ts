import { ChangeDetectionStrategy, Component } from '@angular/core';
import { reactiveMenu, authMenu, countryMenu } from '../../helpers/menu-item.adapter';
import { MenuItem } from '../../interfaces/menu-item.interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveMenu;
  authMenu: MenuItem[] = authMenu
  countryMenu: MenuItem[] = countryMenu;
}
