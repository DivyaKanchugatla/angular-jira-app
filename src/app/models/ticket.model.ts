export interface Ticket {
  assignedTo: string;
  createdBy: string;
  createdDate: Date;
  projectName: string;
  ticketType: string;
  ticketId: number;
  summary: string;
  status: string;
  sprintReport: string;
  storyPoints: number;
  priority: string;
}