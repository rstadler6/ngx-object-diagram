import {Component, Input} from '@angular/core';

@Component({
  selector: '[ngx-reload-button]',
  templateUrl: './ngx-reload-button.component.html',
  styleUrls: ['./ngx-reload-button.component.scss']
})
export class NgxReloadButtonComponent {
  @Input()
  public x = 0;

  @Input()
  public y = 0;

  @Input()
  public height = 40;

  @Input()
  public width = 225;
}
