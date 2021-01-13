import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { Component, OnInit } from '@angular/core';
import { Status } from '@features/tickets/models/ticket';
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
  pieChartLabels: Label[] = [['Open'], ['In Progress'], ['Testing']];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['#dc3545', '#ffe599', '#007bff']
    }
  ];

  constructor(private store: Store<fromTickets.State>) {}

  ngOnInit(): void {
    this.store.select(selectAllTickets).subscribe((tickets) => {
      let open = 0;
      let inProgress = 0;
      let testing = 0;

      tickets.map((ticket) => {
        switch (ticket.status) {
          case Status.OPEN:
            open++;
            break;
          case Status.IN_PROGRESS:
            inProgress++;
            break;
          case Status.TESTING:
            testing++;
            break;
        }
      });

      this.pieChartData = [open, inProgress, testing];
    });
  }
}
