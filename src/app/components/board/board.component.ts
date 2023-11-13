// board.ts
import { Component } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  ticketsArray: any[] = [];
  status: string[]= ['To Do','In Progress','Done'];

  constructor(private ticketService: TicketsService) { 
  }

  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      console.log("ngOnInit", this.ticketsArray);
    });
  }
}
