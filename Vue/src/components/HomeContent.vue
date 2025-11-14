<script setup lang="ts">
import { ref, type Ref } from 'vue';

import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { DxEditing, DxScheduler, type DxSchedulerTypes } from 'devextreme-vue/scheduler';
import type { DxButtonTypes } from 'devextreme-vue/button';
import DxPopup, { DxToolbarItem } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { formatDate } from 'devextreme/localization';
import notify from 'devextreme/ui/notify';

import { appointments, EditData, rows, seats } from './data.js';

const views: DxSchedulerTypes.ViewType[] = ['day', 'timelineDay'];

const currentDate: Date = new Date(2015, 4, 25);

const schedulerRef: Ref<DxScheduler | null> = ref(null);

const editAppointmentData: Ref<EditData> = ref(new EditData());

const isCustomPopupVisible = ref(false);

function onAppointmentFormOpening(e: DxSchedulerTypes.AppointmentFormOpeningEvent) {
  e.cancel = true;
  editAppointmentData.value = { ...e.appointmentData as EditData };
  if (editAppointmentData.value.id) {
    isCustomPopupVisible.value = true;
  }
}

function onHiding() {
  editAppointmentData.value = new EditData();
}

function setSeatPrice(basePrice: number, row: string): number {
  const multiplier: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
  };
  return basePrice * multiplier[row];
}

function updateBooking() {
  if (editAppointmentData.value.seatRow && editAppointmentData.value.seatNumber) {
    const oldAppointmentData = appointments.find(item => item.id === editAppointmentData.value.id);
    if (schedulerRef.value?.instance && oldAppointmentData) {
      schedulerRef.value.instance.updateAppointment(
        oldAppointmentData,
        editAppointmentData.value
      );
      notify(`Selected seat ${editAppointmentData.value.seatRow}${editAppointmentData.value.seatNumber} for ${editAppointmentData.value.text}. Enjoy!`);
    }
  }
  isCustomPopupVisible.value = false;
}

const buttonOptions: DxButtonTypes.Properties = {
  text: 'OK',
  onClick: updateBooking,
};

</script>
<template>
  <div>
    <div class="long-title">
      <h3>DXCinema Upcoming Movies</h3>
    </div>

    <DxScheduler
      id="scheduler"
      ref="schedulerRef"
      :data-source="appointments"
      :views="views"
      current-view="day"
      :current-date="currentDate"
      :first-day-of-week="0"
      :start-day-hour="9"
      :end-day-hour="23"
      :show-all-day-panel="false"
      :height="600"
      @appointment-form-opening="onAppointmentFormOpening"
    >
      <DxEditing
        :allow-resizing="false"
        :allow-dragging="false"
      />
    </DxScheduler>

    <DxPopup
      :width="500"
      :height="520"
      :hide-on-outside-click="true"
      v-model:visible="isCustomPopupVisible"
      :title="editAppointmentData.text"
      @hiding="onHiding"
    >
      <template #content>
        <DxScrollView
          width="90%"
          height="90%"
        >
          <div class="movie-popup-content">
            <img :src="editAppointmentData.image">
            <div class="movie-details">
              <div>
                <p class="movie-title">{{ editAppointmentData.text }}</p>
                <p>Year: {{ editAppointmentData.year }}</p>
                <p>Duration: {{ editAppointmentData.duration }} minutes</p>
              </div>
              <div class="movie-time">
                {{ formatDate(editAppointmentData.startDate, "shortTime") }} -
                {{ formatDate(editAppointmentData.endDate, "shortTime") }}
              </div>
              <p>Price ($):
                <span>
                  {{
                    editAppointmentData.seatRow && editAppointmentData.seatNumber
                      ? setSeatPrice(
                        editAppointmentData.price,
                        editAppointmentData.seatRow
                      )
                      : "Pick a seat for pricing"
                  }}
                </span>
              </p>
              <DxSelectBox
                :data-source="rows"
                :width="400"
                placeholder="Pick a row"
                v-model:value="editAppointmentData.seatRow"
              />
              <DxSelectBox
                :data-source="seats"
                :width="400"
                placeholder="Pick a seat"
                v-model:value="editAppointmentData.seatNumber"
              />
            </div>
          </div>
        </DxScrollView>
      </template>
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="buttonOptions"
      />
    </DxPopup>
  </div>
</template>

<style scoped>
  .long-title h3 {
    font-family: 'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana;
    font-weight: 200;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
  }

  .movie-popup-content {
      display: flex;
      flex-direction: row;
      gap: 30px;
  }

  .movie-popup-content img {
      height: auto;
      width: 200px;
      flex: 0 0 auto;
      max-width: 100%;
  }

  .movie-title {
      font-family: 'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana;
      font-size: 24px;
      text-align: center;
  }

  .movie-details {
      display: flex;
      flex-direction: column;
      width: 200px;
      gap: 10px;
  }

  .movie-time {
      font-size: 18px;
      text-align: center;
  }
</style>
