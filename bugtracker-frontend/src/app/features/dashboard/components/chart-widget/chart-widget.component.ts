import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { Component, OnInit } from '@angular/core';
import * as fromTickets from '@features/tickets/store/tickets.reducer';
import { selectAllTickets } from '@features/tickets/store/tickets.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnInit {
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top'
    }
  };
  pieChartLabels: Label[] = [
    ['Open'],
    ['In Progress'],
    ['Testing'],
    ['Closed']
  ];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
        'yellow'
      ]
    }
  ];

  constructor(private store: Store<fromTickets.State>) {}

  ngOnInit(): void {
    this.pieChartData = [1, 2, 2, 1];

    this.store
      .select(selectAllTickets)
      .subscribe((hier) => console.log('hier', hier));
  }
}
