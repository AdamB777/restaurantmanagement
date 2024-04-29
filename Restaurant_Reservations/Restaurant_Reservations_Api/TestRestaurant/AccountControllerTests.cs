using Api.Controllers;
using Application.Core;
using Application.CQRS.Customers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ModelsDB.SystemUsers;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestRestaurant
{
    public class AccountControllerTests
    {
        [Fact]
        public async Task GetCustomers_ReturnsListWithCustomers()
        {
            // Arrange
            var mediatorMock = new Mock<IMediator>();
            var customerList = new List<TestCustomer>
            {
                //new TestCustomer("Jan", "Jaksis"),
                //new TestCustomer("Grazyna", "Ze Szczecina"),
                //new TestCustomer("Mateusz", "Bialy"),
                //new TestCustomer("Pola", "Testowa"),
                //new TestCustomer("Basia", "Tortowa")
            };

            var expectedResult = Result<List<TestCustomer>>.Success(customerList);

            mediatorMock.Setup(x => x.Send(It.IsAny<CustomerList.Query>(), default))
                .ReturnsAsync(expectedResult);

            var controller = new AccountController(null, null, mediatorMock.Object);

            // Act
            var result = await controller.GetCustomers();

            // Assert

            Assert.NotNull(result);
            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult);

            //Assert.IsType<OkObjectResult>(result);
            //var okResult = result as OkObjectResult;
            //Assert.NotNull(okResult);
            //Assert.IsAssignableFrom<IEnumerable<TestCustomer>>(okResult.Value);
            //var returnedCustomers = okResult.Value as IEnumerable<TestCustomer>;
            //Assert.Equal(customerList, returnedCustomers);
        }
    }
}
