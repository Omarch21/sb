import { Component } from '@angular/core';
import { Item } from './item.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
/*  Preamble 
    Ian
    addItem
    10/7/2023
    Allows the user to addItems to the list
    V1.0
    RT# 4

*/
export class ItemListComponent {
  items: Item[] = [
    new Item(new Date(), 'Item 1', 'Description 1', 'High'),
    new Item(new Date(), 'Item 2', 'Description 2', 'Medium'),
    new Item(new Date(), 'Item 3', 'Description 3', 'Low'),
  ];
  formDate: string = '';
  formTitle: string = '';
  formDescription: string = '';
  formPriority: string = '';

  addItem() {
    if (!this.formDate || !this.formTitle || !this.formDescription || !this.formPriority) {
      // Ensure all fields are filled out
      return;
    }

    const newItem = new Item(new Date(this.formDate), this.formTitle, this.formDescription, this.formPriority);
    this.items.push(newItem);

    // Reset form inputs
    this.formDate = '';
    this.formTitle = '';
    this.formDescription = '';
    this.formPriority = '';
  }
  
  editItem(item: Item) {
    // Set the form fields with the selected item's data for editing
    this.formDate = item.date.toISOString().split('T')[0];
    this.formTitle = item.title;
    this.formDescription = item.description;
    this.formPriority = item.priority;

    // You can also remove the edited item from the list if needed
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
