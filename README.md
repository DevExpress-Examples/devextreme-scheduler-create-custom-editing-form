<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/331598295/20.2.4%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T966774)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# Scheduler for DevExtreme - How to create a custom editing form

This example demonstrates how to create a custom editing form for appointments.

The main idea is to use a [Popup](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxPopup/) to display appointment data and to update appointments by calling methods from the [Scheduler API](https://js.devexpress.com/Documentation/Guide/Widgets/Scheduler/Appointments/Update_Appointments/#API).

In our particular case, we use a custom editing form to select a seat for a chosen movie.

<div align="center"><img alt="DevExtreme Scheduler - How to create a custom editing form" src="scheduler-custom-editor.png" /></div>

## Files to Review

- **jQuery**
    - [index.html](jquery/index.html)
    - [script.js](jquery/script.js)
- **Angular**
    - [app.component.html](angular/src/app/app.component.html)
    - [app.component.ts](angular/src/app/app.component.ts)
- **Vue**
    - [App.vue](vue/src/App.vue)
- **React**
    - [App.js](react/src/App.js)
- **ASP.Net Core**    
    - [Index.cshtml](ASP.NET%20Core/ASP.NET%20Core/Views/Home/Index.cshtml)
    
## Documentation

- [Getting Started with Scheduler](https://js.devexpress.com/Documentation/Guide/UI_Components/Scheduler/Getting_Started_with_Scheduler/)

- [Scheduler - API Reference](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxScheduler/)
