import { Component } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent {
  ticketsArray:any[]=[];
  id:any;
  selectedTicket:any;
 
constructor(private ticketsService:TicketsService, private route: ActivatedRoute,private router:Router){
  
}

ngOnInit() {
  this.ticketsService.projectTicketsArray$.subscribe((tickets) => {
    this.ticketsArray = tickets;
  });

  this.route.queryParamMap.subscribe(params => {
    this.id = params.get('id') || ''; 
    const filteredTickets = this.ticketsArray.filter(m => m.ticketId == this.id);
    if (filteredTickets.length > 0) {
      this.selectedTicket = filteredTickets[0];
    } else {
      console.error("Ticket not found with id: ", this.id);
    }
  });
}
 
saveTicket() {
    const newTicketArray = this.ticketsArray.map((ticket)=>{
      return ticket.ticketId === this.selectedTicket.ticketId ? this.selectedTicket : ticket
    })
      localStorage.setItem('allTicketsArray', JSON.stringify(newTicketArray));
      this.router.navigate(['/board']);
}

}
