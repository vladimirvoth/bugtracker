import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  _pageType: 'A' | 'B' | 'C' | 'D' = 'A';

  set pageType(value: 'A' | 'B' | 'C' | 'D') {
    this._pageType = value;
    this.cdRef.markForCheck();
  }

  get pageType() {
    return this._pageType;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  resetPageType() {
    this.pageType = 'A';
    this.cdRef.markForCheck();
  }
}
