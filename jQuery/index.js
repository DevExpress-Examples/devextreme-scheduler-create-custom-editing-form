$(function(){  
      
  var rowOptions = {
    dataSource: ['A','B','C','D'],
    width: 400,
    placeholder: "Pick a row"
  };

  var seatOptions = {
    dataSource: [1,2,3,4,5],
    width: 400,
    placeholder: "Pick a seat"
  };

  function setSeatPrice(basePrice, row){
    let rowPrice;
    if(row == 'A')
      rowPrice = 1;
    else if(row == 'B')
      rowPrice = 2;
    else if(row == 'C')
      rowPrice = 3;
    else if(row == 'D')
      rowPrice = 4;
    
    return basePrice * rowPrice;
  };
      
  
  function setContentTemplate(editParams){           
    editPopupOptions.data = {};
    editPopupOptions.data = editParams;
    var movieInfo = data.find(e=>e.id == editParams.id) || {};            
    var imageView = $(`<img src='${movieInfo.image}' class='dx-field-label'>`);
    var infoView = $(`<div class='dx-field-label'><p><b>${movieInfo.text}</b></p>
                      <p>Year: ${movieInfo.year}</p> 
                      <p>Duration: ${movieInfo.duration} minutes</p></div>`);
    var scheduleView = $("<div class='dx-field-label'><b>" + DevExpress.localization.formatDate(editParams.startDate, "shortTime") +
                          " - " + DevExpress.localization.formatDate(editParams.endDate, "shortTime") +
                          "</b></div><br/><div class='dx-field-label'><b>Price ($): </b></div>");            
    var priceView = $(`<div id='priceView' class='dx-field-label'>${editParams.seatPrice ? editParams.seatPrice : "Pick a seat for pricing"}</div><br/><br/>`);            
    var rowView = $("<div id='rowView' class='dx-field-label'></div><br/><br/>");           
    var seatView = $("<div id='seatView' class='dx-field-label'></div><br/><br/>");
    
    
  
    rowView.dxSelectBox({...rowOptions,
      value: editParams.seatRow,
      onValueChanged: function(e){
        if(seatView.dxSelectBox("instance").option("value")){ 
          $("#priceView").text(setSeatPrice(editParams.price, rowView.dxSelectBox("instance").option("value")));
        }                                   
      }
    });

    seatView.dxSelectBox({...seatOptions,
      value: editParams.seatNumber,
      onValueChanged: function(e){
        if(rowView.dxSelectBox("instance").option("value")){
          $("#priceView").text(setSeatPrice(editParams.price, rowView.dxSelectBox("instance").option("value")));
        }                                    
      }
      }); 

    var scrollView = $("<div id='scrollView'></div>");
    
    scrollView.append(imageView, infoView, scheduleView, priceView, rowView, seatView).addClass("dx-fieldset");
    
    scrollView.dxScrollView({
      height: '100%',
      width: '100%'          
    });          
    
    return scrollView;

  }; 

          
  var editPopupOptions = { 
    width: 500,
    closeOnOutsideClick: true,
    visible: false,       
    toolbarItems: [{
      toolbar: "bottom",
      widget: "dxButton",
      location: "after",
      options: { 
        text: "OK", 
        onClick: function(){
          let newData = {
            seatPrice: $("#priceView").text(),
            seatRow: $("#rowView").dxSelectBox("instance").option("value"),
            seatNumber: $("#seatView").dxSelectBox("instance").option("value")                 
          };

          newData = {...editPopupOptions.data, ...newData};                 

          if(newData.seatRow && newData.seatNumber){
            scheduler.updateAppointment(editPopupOptions.data, newData);                    
            DevExpress.ui.notify("Selected seat " + newData.seatRow + newData.seatNumber + " for " + newData.text + ". Enjoy!");
          }

          editPopup.hide();
        }
      }
    }]     
  };
  
  var editAppointmentData;    
  var editPopup = $("#editpopup").dxPopup(editPopupOptions).dxPopup("instance");
  
  var scheduler =  $("#scheduler").dxScheduler({        
    dataSource: data,     
    editing: {
      allowResizing: false,
      allowDragging: false
    },
    views: ["day", "timelineDay"],
    currentView: "day",
    currentDate: new Date(2015, 4, 25),
    firstDayOfWeek: 0,
    startDayHour: 9,
    endDayHour: 23,
    showAllDayPanel: false,
    height: 600,
    onAppointmentFormOpening: function(e) {          
      e.cancel = true;           
      editAppointmentData = e.appointmentData;          
      if(editAppointmentData.id){            
        editPopup.option({
          contentTemplate: function(container){
            container.append(setContentTemplate(editAppointmentData));
          },
          title: data.find(e=> e.id == editAppointmentData.id).text,
          visible: true
        });
      }
    }
  }).dxScheduler("instance");    
           
});


var data = [{       
  id: 1,
  price: 10,
  startDate: new Date(2015, 4, 25, 9, 10),
  endDate: new Date(2015, 4, 25, 11, 1),
  text: "His Girl Friday",
  director: "Howard Hawks",
  year: 1940,
  image: "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/HisGirlFriday.jpg",
  duration: 92
}, {
  id: 2,
  price: 5,
  startDate: new Date(2015, 4, 25, 11, 30),
  endDate: new Date(2015, 4, 25, 13, 2),
  text: "Royal Wedding",
  director: "Stanley Donen",
  year: 1951,
  image: "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/RoyalWedding.jpg",
  duration: 93,        
}, {        
  id: 3,
  price: 15,
  startDate: new Date(2015, 4, 25, 13, 30),
  endDate: new Date(2015, 4, 25, 15, 21),
  text: "A Star Is Born",
  director: "William A. Wellman",
  year: 1937,
  image: "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/AStartIsBorn.jpg",
  duration: 111        
}];