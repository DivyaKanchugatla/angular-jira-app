import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Ticket } from 'src/app/models/ticket.model';
import { ChangeDetectionStrategy } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sprint-reports',
  templateUrl: './sprint-reports.component.html',
  styleUrls: ['./sprint-reports.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SprintReportsComponent implements OnInit {
  dataSource: Ticket[] = [];
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
      this.dataSource = this.ticketsArray;
    });
  }

  filterTickets() {
    const selectedSprintLowerCase = this.selectedSprint.toLowerCase();
    if (selectedSprintLowerCase === " ") {
      this.dataSource = this.ticketsArray
    } else {
      this.dataSource = this.ticketsArray.filter((ticket) =>
        ticket.sprintReport.toLowerCase().includes(selectedSprintLowerCase)
      )
    }
  }

  fileName = "ExcelSheet.xlsx";
  exportexcel() {
    let data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, this.fileName)
  }

}
