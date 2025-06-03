import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IContact } from '../../shared/icontact';
import { ContactsService } from '../../services/contacts.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-contacts-list',
  imports: [
    CommonModule
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit {

  contact:IContact[] = [];

  private readonly _contactsService:ContactsService=inject(ContactsService);

  ngOnInit(): void {
    this._contactsService.getContacts().pipe(
      map(data=>this.contact=data;)
    ).subscribe();
  }

}
