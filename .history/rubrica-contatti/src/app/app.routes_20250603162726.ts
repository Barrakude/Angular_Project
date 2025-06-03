import { Routes } from '@angular/router';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { ContactNewComponent } from './pages/contact-new/contact-new.component';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';

export const routes: Routes = [
    {path:"", redirectTo:"contatti",pathMatch:"full"},
    {path:"contatti", component: ContactsListComponent},
    {path:"contatti/nuovo", component: ContactNewComponent},
    {path:"contatti/:id", component:ContactDetailComponent}
];
