import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Ticket } from 'src/app/models/ticket.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sprint-reports',
  templateUrl: './sprint-reports.component.html',
  styleUrls: ['./sprint-reports.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SprintReportsComponent implements OnInit {
  dataSource = new MatTableDataSource<Ticket>([]);
  displayedColumns: string[] = ['key', 'summary', 'issuetype', 'priority', 'status', 'storypoints'];
  ticketsArray: Ticket[] = [];
  selectedSprint = "";

  sprints = [
    {
      name: 'MAR A',
      Date: '3/11/24',
    },
    {
      name: 'MAR B',
      Date: '3/21/24',
    },
    {
      name: 'MAR C',
      Date: '3/31/24',
    },
  ];

  constructor(private ticketService: TicketsService) { }

  onChange() {
    this.filterTickets();
  }

  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
    });
  }

  filterTickets() {
    const selectedSprintLowerCase = this.selectedSprint.toLowerCase();
    this.dataSource.data = this.ticketsArray.filter((ticket) =>
      ticket.sprintReport.toLowerCase().includes(selectedSprintLowerCase)
    );
  }
}
