import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { Component, Input, OnInit } from '@angular/core';
import { Status } from '@features/tickets/models/ticket';

import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnInit {
  @Input() tickets: Array<Ticket>;

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

  constructor() {}

  ngOnInit(): void {
    let open = 0;
    let inProgress = 0;
    let testing = 0;

    this.tickets.map((ticket) => {
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
  }
}
