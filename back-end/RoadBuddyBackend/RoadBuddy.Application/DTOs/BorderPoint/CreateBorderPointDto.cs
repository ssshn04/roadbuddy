using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.DTOs.BorderPoint
{
    public class CreateBorderPointDto
    {
        public string Name { get; set; } = default!;
        public string Location { get; set; } = default!;
    }
}
