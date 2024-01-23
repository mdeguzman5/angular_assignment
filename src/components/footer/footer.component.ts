import { Component } from '@angular/core';

@Component({
  selector: 'pnc-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public year = new Date().getFullYear();
  public fullName = 'Marc Louis Gene De Guzman';
}
