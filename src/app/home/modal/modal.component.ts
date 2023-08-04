import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  msg = '';
  isError = false;
  loading = false;
  selectedHours: number = 0;
  selectedMinutes: number = 0;
  breakMinDuration: number = 0;
  breakSecDuration: number = 0;
  totalTimeInMs = 0;
  durationInMs = 0;

  @Output() closeBreakModal = new EventEmitter<boolean>();
  @Output() modalEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  addRem() {
    this.totalTimeInMs = (this.selectedHours * 60 + this.selectedMinutes) * 60 * 1000;
    this.durationInMs = (this.breakMinDuration * 60 + this.breakSecDuration) * 1000;
    this.modalEvent.emit({ breakTime: this.totalTimeInMs, breakDuration: this.durationInMs });
  }


  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  isInvalid(field): boolean {
    if (field) {
      if (field.invalid && (field.dirty || field.touched)) {
        return true;
      }
    }
    return false;
  }

  closeModal(): void {
    this.closeBreakModal.emit(true);
  }

}

