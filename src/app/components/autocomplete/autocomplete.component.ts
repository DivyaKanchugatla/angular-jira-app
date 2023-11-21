import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  control = new FormControl('');
  filteredOptions: any[] = [];
  ticketsArray: any[] = [];

  constructor(private ticketService: TicketsService) {}
  

  ngOnInit() {
    this.ticketService.projectTicketsArray$.subscribe((tickets) => {
      this.ticketsArray = tickets;
      this.filterOptions();
    });

    this.control.valueChanges.subscribe(() => {
      this.filterOptions();
    });
  }

  filterOptions() {
    const filterValue = (this.control.value || '').toLowerCase(); 
    this.filteredOptions = this.ticketsArray.filter(option => option.projectName.toLowerCase().includes(filterValue));
  }
}
