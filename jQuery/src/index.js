$(() => {
  function setSeatPrice(basePrice, row) {
    const multiplier = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    };
    return basePrice * multiplier[row];
  }

  function setContentTemplate(editParams) {
    const movieInfo = data.find((e) => e.id === editParams.id) || {};
    const imageView = $(`<img src='${movieInfo.image}'>`);
    const infoView = $(`<div><p class='movie-title'>${movieInfo.text}</p>
                      <p>Year: ${movieInfo.year}</p> 
                      <p>Duration: ${movieInfo.duration} minutes</p></div>`);
    const scheduleView = $(`<div class="movie-time">${DevExpress.localization.formatDate(editParams.startDate, 'shortTime')} - ${DevExpress.localization.formatDate(editParams.endDate, 'shortTime')}</div>`);
    const priceView = $(`<p>Price ($): <span id='priceView'>${editParams.seatPrice ? editParams.seatPrice : 'Pick a seat for pricing'}</span></p>`);
    const rowView = $('<div id="rowView"></div>');
    const seatView = $('<div id="seatView"></div>');

    const container = $('<div class="movie-popup-content"></div>');
    const movieDetails = $('<div class="movie-details"></div>');
    movieDetails.append(infoView, scheduleView, priceView, rowView, seatView);
    container.append(imageView, movieDetails);

    rowView.dxSelectBox({
      dataSource: ['A', 'B', 'C', 'D'],
      label: 'Row',
      value: editParams.seatRow,
      onValueChanged: (e) => {
        if (seatView.dxSelectBox('instance').option('value')) {
          $('#priceView').text(setSeatPrice(editParams.price, rowView.dxSelectBox('instance').option('value')));
        }
      },
    });

    seatView.dxSelectBox({
      dataSource: [1, 2, 3, 4, 5],
      label: 'Seat',
      value: editParams.seatNumber,
      onValueChanged: (e) => {
        if (rowView.dxSelectBox('instance').option('value')) {
          $('#priceView').text(setSeatPrice(editParams.price, rowView.dxSelectBox('instance').option('value')));
        }
      },
    });

    const scrollView = $('<div id="scrollView"></div>');
    scrollView.append(container).addClass('dx-fieldset');
    scrollView.dxScrollView({
      height: '90%',
      width: '90%',
    });
    return scrollView;
  }

  const editPopup = $('#editpopup').dxPopup({
    width: 500,
    height: 520,
    closeOnOutsideClick: true,
    visible: false,
    toolbarItems: [{
      toolbar: 'bottom',
      widget: 'dxButton',
      location: 'after',
      options: {
        text: 'OK',
        onClick: () => {
          let newData = {
            seatPrice: $('#priceView').text(),
            seatRow: $('#rowView').dxSelectBox('instance').option('value'),
            seatNumber: $('#seatView').dxSelectBox('instance').option('value'),
          };

          newData = { ...editAppointmentData, ...newData };

          if (newData.seatRow && newData.seatNumber) {
            scheduler.updateAppointment(editAppointmentData, newData);
            DevExpress.ui.notify(`Selected seat ${newData.seatRow}${newData.seatNumber} for '${newData.text}'. Enjoy!`);
          }

          editPopup.hide();
        },
      },
    }],
  }).dxPopup('instance');

  let editAppointmentData;

  const scheduler = $('#scheduler').dxScheduler({
    dataSource: data,
    editing: {
      allowResizing: false,
      allowDragging: false,
    },
    views: ['day', 'timelineDay'],
    currentView: 'day',
    currentDate: new Date(2015, 4, 25),
    firstDayOfWeek: 0,
    startDayHour: 9,
    endDayHour: 23,
    showAllDayPanel: false,
    height: 600,
    onAppointmentFormOpening: (e) => {
      e.cancel = true;
      editAppointmentData = e.appointmentData;
      if (editAppointmentData.id) {
        editPopup.option({
          contentTemplate: (container) => {
            container.append(setContentTemplate(editAppointmentData));
          },
          title: editAppointmentData.text,
          visible: true,
        });
      }
    },
  }).dxScheduler('instance');
});
