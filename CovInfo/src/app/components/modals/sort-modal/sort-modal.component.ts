import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.sass']
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {
    this.name = "nazwa";
  }
}

@Component({selector: 'ngbd-modal-component', templateUrl: './modal-component.html'})
export class SortModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}