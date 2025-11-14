import {
  useReducer, useRef, useMemo, useCallback,
} from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import Scheduler, {
  Editing, type SchedulerRef, type SchedulerTypes,
} from 'devextreme-react/scheduler';
import { type ButtonTypes } from 'devextreme-react/button';
import Popup, { ToolbarItem } from 'devextreme-react/popup';
import {
  SelectBox, type SelectBoxTypes,
} from 'devextreme-react/select-box';
import { ScrollView } from 'devextreme-react/scroll-view';
import notify from 'devextreme/ui/notify';
import { formatDate } from 'devextreme/localization';
import {
  appointments, rows, seats, EditData,
} from './data';

const views: SchedulerTypes.ViewType[] = ['day', 'timelineDay'];

const currentDate = new Date(2015, 4, 25);

const initState = {
  popupVisible: false,
  popupTitle: '',
  editData: new EditData(),
};

function reducer(state: typeof initState, action: Partial<typeof initState>): typeof initState {
  return { ...state, ...action };
}

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initState);

  const schedulerRef = useRef<SchedulerRef>(null);

  const buttonConfig = useMemo((): ButtonTypes.Properties => ({
    text: 'OK',
    onClick(): void {
      if (state.editData.seatRow && state.editData.seatNumber) {
        const oldAppointmentData = appointments.find((x) => x.id === state.editData.id);
        if (schedulerRef.current && oldAppointmentData) {
          schedulerRef.current.instance().updateAppointment(
            oldAppointmentData,
            state.editData,
          );
        }
        notify(`Selected seat ${state.editData.seatRow}${state.editData.seatNumber} for ${state.editData.text}. Enjoy!`);
        dispatch({ popupVisible: false });
      }
    },
  }), [state]);

  function setSeatPrice(basePrice: number, row: string): number {
    const multiplier: Record<string, number> = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    };
    return basePrice * multiplier[row];
  }

  const onAppointmentFormOpening = useCallback((e: SchedulerTypes.AppointmentFormOpeningEvent): void => {
    e.cancel = true;
    dispatch({ popupVisible: true, editData: { ...e.appointmentData } as EditData });
  }, []);

  const onHiding = useCallback((): void => {
    dispatch({ popupVisible: false });
  }, []);

  const popupRender = useCallback((): JSX.Element => {
    const rowChanged = useCallback((e: SelectBoxTypes.ValueChangedEvent) => {
      dispatch({ editData: { ...state.editData, seatRow: e.value } });
    }, [state.editData]);

    const seatChanged = useCallback((e: SelectBoxTypes.ValueChangedEvent) => {
      dispatch({ editData: { ...state.editData, seatNumber: e.value } });
    }, [state.editData]);

    return (<ScrollView width="90%" height="90%">
      <div>
        <div className="movie-popup-content">
          <img src={state.editData.image} alt="" />
          <div className="movie-details">
            <div>
              <p className="movie-title">{state.editData.text}</p>
              <p>Year: {state.editData.year}</p>
              <p>Duration: {state.editData.duration}</p>
            </div>
            <div className='movie-time'>
              <b>{formatDate(state.editData.startDate, 'shortTime')} - {formatDate(state.editData.endDate, 'shortTime')}</b>
            </div>
            <p>Price ($):
              <span>
                {
                  state.editData.seatRow
                    && state.editData.seatNumber
                    ? setSeatPrice(state.editData.price, state.editData.seatRow)
                    : 'Pick a seat for pricing'
                }
              </span>
            </p>

            <SelectBox
              dataSource={rows}
              width={400}
              placeholder="Pick a row"
              onValueChanged={rowChanged}
              value={state.editData.seatRow}></SelectBox>

            <SelectBox
              dataSource={seats}
              width={400}
              placeholder="Pick a seat"
              onValueChanged={seatChanged}
              value={state.editData.seatNumber}></SelectBox>
          </div>
        </div>
      </div>
    </ScrollView>);
  }, [state.editData]);

  return (
    <div>
      <div className="long-title">
        <h3>DXCinema Upcoming Movies</h3>
      </div>
      <Scheduler id="scheduler"
        ref={schedulerRef}
        dataSource={appointments}
        views={views}
        defaultCurrentView="day"
        defaultCurrentDate={currentDate}
        firstDayOfWeek={0}
        startDayHour={9}
        endDayHour={23}
        showAllDayPanel={false}
        height={600}
        onAppointmentFormOpening={onAppointmentFormOpening}>
        <Editing allowResizing={false} allowDragging={false} />
      </Scheduler>
      <Popup
        visible={state.popupVisible}
        width={500}
        height={520}
        hideOnOutsideClick={true}
        onHiding={onHiding}
        title={state.editData.text}
        contentRender={popupRender}>
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={buttonConfig} />
      </Popup>
    </div>
  );
}

export default App;
