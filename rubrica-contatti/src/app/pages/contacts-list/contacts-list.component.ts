
import { Component, inject, OnInit } from '@angular/core';
import { IContact } from '../../shared/icontact';
import { ContactsService } from '../../services/contacts.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit {

  contacts:IContact[] = [];

  private readonly _contactsService:ContactsService=inject(ContactsService);

  ngOnInit(): void {
    this._contactsService.getContacts().pipe(
      map(data => this.contacts = data)
    ).subscribe();
  }

}
