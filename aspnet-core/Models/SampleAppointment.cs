using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASP.NET_Core.Models
{
    public class SampleAppointment
    {
        public int ID { get; set; }
        public int Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Text { get; set; }
        public string Director { get; set; }
        public int Year { get; set; }
        public string Image { get; set; }
        public int Duration { get; set; }
        public string SeatRow { get; set; }
        public int SeatNumber { get; set; }

    }
}
