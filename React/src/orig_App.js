import React, { useMemo, useRef, useReducer } from "react";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import "./App.css";

import Scheduler, { Editing } from "devextreme-react/scheduler";
import Popup, { ToolbarItem } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import SelectBox from "devextreme-react/select-box";
import { formatDate } from 'devextreme/localization';
import notify from 'devextreme/ui/notify';

import { Data, Rows, Seats } from "./data";

const views = ["day", "timelineDay"];

const initState = {
    popupVisible: false,
    popupTitle: "",
    editData: {}
};

function reducer(state, action) {
    return { ...state, ...action };
}

function App() {
    const [state, dispatch] = useReducer(reducer, initState);

    const SchedulerRef = useRef(null);
    const currentDate = new Date(2015, 4, 25);

    const buttonConfig = useMemo(() => {
        return {
            text: "OK",
            onClick: function () {
                if (state.editData.seatRow && state.editData.seatNumber) {
                    let oldAppointmentData = Data.find(x => x.id === state.editData.id);
                    SchedulerRef.current.instance.updateAppointment(
                        oldAppointmentData,
                        state.editData
                    );

                    notify(`Selected seat ${state.editData.seatRow}${state.editData.seatNumber} for ${state.editData.text}. Enjoy!`);
                    dispatch({ popupVisible: false });
                }
            }
        }
    }, [state]);

    function setSeatPrice(basePrice, row) {
        let rowPrice;
        switch (row) {
            case 'A':
                rowPrice = 1;
                break;
            case 'B':
                rowPrice = 2;
                break;
            case 'C':
                rowPrice = 3;
                break;
            case 'D':
                rowPrice = 4;
                break;
            default:
                break;
        }
        return basePrice * rowPrice;
    }

    function onAppointmentFormOpening(e) {
        e.cancel = true;
        dispatch({ popupVisible: true, editData: { ...e.appointmentData } });
    }

    function onHiding(e) {
        dispatch({ popupVisible: false });
    }

    function popupRender(props) {
        function rowChanged(e) {
            dispatch({ editData: { ...state.editData, seatRow: e.value } });
        }

        function seatChanged(e) {
            dispatch({ editData: { ...state.editData, seatNumber: e.value } });
        }

        return (<ScrollView width="100%" height="100%">
            <div>
                {JSON.stringify(state.editData)}
                <img src={state.editData.image} alt="" className="dx-field-label" />
                <div className="dx-field-label">
                    <p><b>{state.editData.text}</b></p>
                    <p>Year: {state.editData.year}</p>
                    <p>Duration: {state.editData.duration}</p>
                </div>

                <div className="dx-field-label">
                    <b>{formatDate(state.editData.startDate, "shortTime")} - {formatDate(state.editData.endDate, "shortTime")}</b>
                </div>

                <div className="dx-field-label"><b>Price ($):</b></div>
                <div className="dx-field-label">
                    {
                        state.editData.seatRow &&
                            state.editData.seatNumber ?
                            setSeatPrice(state.editData.price, state.editData.seatRow) :
                            "Pick a seat for pricing"
                    }
                </div>

                <SelectBox
                    className="dx-field-label"
                    dataSource={Rows}
                    width={400}
                    placeholder="Pick a row"
                    onValueChanged={rowChanged}
                    value={state.editData.seatRow}></SelectBox>

                <SelectBox
                    className="dx-field-label"
                    dataSource={Seats}
                    width={400}
                    placeholder="Pick a seat"
                    onValueChanged={seatChanged}
                    value={state.editData.seatNumber}></SelectBox>

            </div>
        </ScrollView>);
    }

    return (
        <div>
            <div className="long-title">
                <h3>DXCinema Upcoming Movies</h3>
            </div>
            <Scheduler id="scheduler"
                ref={SchedulerRef}
                dataSource={Data}
                views={views}
                defaultCurrentView="day"
                currentDate={currentDate}
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
                closeOnOutsideClick={true}
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