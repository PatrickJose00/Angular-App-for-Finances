import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service'; 
import { Entry } from "../shared/Entry.model"

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = []

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert("Error loading the list")
    )
  }

  deleteEntry(Entry){
    const mustDelete = confirm("Do you wish to delete this item");

    if (mustDelete){
      this.entryService.delete(Entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != Entry),
        () => alert("Error trying to delete")
      )
    }
  }
}
