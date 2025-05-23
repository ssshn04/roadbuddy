using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RoadBuddy.Application.Queries.Users.Get
{
    public class GetUserIdByUserNameQuery : IRequest<Guid?>
    {
        public string UserName { get; set; } = null!;

        public GetUserIdByUserNameQuery(string userName)
        {
            UserName = userName;
        }
    }
}
