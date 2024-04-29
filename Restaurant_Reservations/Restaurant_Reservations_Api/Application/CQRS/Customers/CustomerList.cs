using Application.Core;
using MediatR;
using ModelsDB.SystemUsers;
using RestaurantDB;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CQRS.Customers
{
    public class CustomerList
    {
        public class Query : IRequest<Result<List<TestCustomer>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TestCustomer>>>
        {
            private readonly RestaurantContext _context;

            public Handler(RestaurantContext context)
            {
                _context = context;
            }

            public async Task<Result<List<TestCustomer>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                try
                {
                    var customerList = new List<TestCustomer>
                    {
                        //new TestCustomer("Jan", "Jaksis"),
                        //new TestCustomer("Grazyna", "Ze Szczecina"),
                        //new TestCustomer("Mateusz", "Bialy"),
                        //new TestCustomer("Pola", "Testowa"),
                        //new TestCustomer("Basia", "Tortowa")
                    };

                    return Result<List<TestCustomer>>.Success(customerList);
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("Przyczyna niepowodzenia: " + ex);
                    return Result<List<TestCustomer>>.Failure("Wystąpił błąd podczas pobierania lub mapowania danych.");
                }
            }
        }
    }
}
