using Application.Core;
using Application.DTOs.CustomersDTO;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        public class Query : IRequest<Result<List<CustomerGetDTO>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CustomerGetDTO>>>
        {
            private readonly RestaurantContext _context;

            public Handler(RestaurantContext context)
            {
                _context = context;
            }

            public async Task<Result<List<CustomerGetDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                try
                {
                    var customerList = await 
                        (from customer in _context.CustomersDB
                        select new CustomerGetDTO {
                            Id = customer.Id,
                            FirstName = customer.FirstName,
                            LastName = customer.LastName,
                            Email = customer.Email,
                        }).ToListAsync(cancellationToken);

                    return Result<List<CustomerGetDTO>>.Success(customerList);
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("Przyczyna niepowodzenia: " + ex);
                    return Result<List<CustomerGetDTO>>.Failure("Wystąpił błąd podczas pobierania lub mapowania danych.");
                }
            }
        }
    }
}
