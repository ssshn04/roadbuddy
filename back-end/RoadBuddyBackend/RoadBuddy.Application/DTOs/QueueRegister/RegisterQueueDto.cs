using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.DTOs.QueueRegister
{
    public class RegisterQueueDto
    {
        public Guid UserId { get; set; }
        public Guid BorderPointId { get; set; }
    }
}
