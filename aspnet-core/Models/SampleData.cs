using ASP.NET_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models {
    static class SampleData {
        public static List<SampleAppointment> Appointments = new List<SampleAppointment>() {
            new SampleAppointment
            {
                ID = 1,
                Price = 10,
                StartDate = new DateTime(2015, 4, 25, 9, 10, 0),
                EndDate =  new DateTime(2015, 4, 25, 11, 1, 0),
                Text = "His Girl Friday",
                Director = "Howard Hawks",
                Year = 1940,
                Image = "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/HisGirlFriday.jpg",
                Duration = 92
            },
            new SampleAppointment
            {
                ID = 2,
                Price = 5,
                StartDate = new DateTime(2015, 4, 25, 11, 30, 0),
                EndDate =  new DateTime(2015, 4, 25, 13, 2, 0),
                Text = "Royal Wedding",
                Director = "Stanley Donen",
                Year = 1951,
                Image = "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/RoyalWedding.jpg",
                Duration = 93
            },
            new SampleAppointment
            {
                ID = 3,
                Price = 15,
                StartDate = new DateTime(2015, 4, 25, 13, 20, 0),
                EndDate =  new DateTime(2015, 4, 25, 15, 21, 0),
                Text = "A Star Is Born",
                Director = "William A. Wellman",
                Year = 1937,
                Image = "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/movies/AStartIsBorn.jpg",
                Duration = 111
            }
        };
    }
}
