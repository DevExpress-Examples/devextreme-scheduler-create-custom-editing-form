import { Component, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import {
  DxButtonModule,
  DxPopupModule,
  DxSchedulerComponent,
  DxSchedulerModule,
  DxScrollViewModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { formatDate } from 'devextreme-angular/common/core/localization';
import { DxSchedulerTypes } from 'devextreme-angular/ui/scheduler';
import { Data, EditData, Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    DxSchedulerModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxButtonModule,
  ],
  providers: [Service],
})
export class AppComponent {
  @ViewChild(DxSchedulerComponent, { static: false })
    scheduler!: DxSchedulerComponent;

  data: Data[];

  currentDate: Date = new Date(2015, 4, 25);

  isCustomPopupVisible = false;

  editAppointmentData: EditData = new EditData();

  rows: string[];

  seats: number[];

  formatDate = formatDate;

  constructor(service: Service) {
    this.data = service.getData();
    this.rows = service.getRows();
    this.seats = service.getSeats();

    this.updateAppointment = this.updateAppointment.bind(this);
  }

  onAppointmentFormOpening(e: DxSchedulerTypes.AppointmentFormOpeningEvent): void {
    e.cancel = true;
    this.editAppointmentData = { ...e.appointmentData } as EditData;
    if (this.editAppointmentData.id) {
      this.isCustomPopupVisible = true;
    }
  }

  onHiding(_e: any): void {
    this.editAppointmentData = new EditData();
  }

  updateAppointment(): void {
    if (this.editAppointmentData.seatRow && this.editAppointmentData.seatNumber) {
      const oldAppointmentData = this.data.find((item) => item.id === this.editAppointmentData.id);
      if (oldAppointmentData) {
        this.scheduler.instance.updateAppointment(
          oldAppointmentData,
          this.editAppointmentData,
        );
        notify(`Selected seat ${this.editAppointmentData.seatRow}${this.editAppointmentData.seatNumber} for ${this.editAppointmentData.text}. Enjoy!`);
      }
    }
    this.isCustomPopupVisible = false;
  }

  setSeatPrice(basePrice: number, row: string): number {
    const multiplier: Record<string, number> = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    };
    return basePrice * multiplier[row];
  }
}
