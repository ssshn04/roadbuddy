using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.Commands.RegisterQueque.Delete
{
    public class DeleteQueueEntryCommand : IRequest<bool>
    {
        public Guid QueueEntryId { get; set; }
        public Guid UserId { get; set; }
    }
}
