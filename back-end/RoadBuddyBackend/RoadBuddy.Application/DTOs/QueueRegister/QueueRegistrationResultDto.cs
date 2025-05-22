using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.DTOs.QueueRegister
{
    public class QueueRegistrationResultDto
    {
        public string BorderPointName { get; set; } = default!;
        public int Position { get; set; }
        public DateTime EnqueuedAt { get; set; }
        public TimeSpan EstimatedWaitTime { get; set; }
    }
}
