using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ModelsDB;
using ModelsDB.SystemUsers;
using System.Security.Cryptography.X509Certificates;

namespace RestaurantDB
{
    public class Seed
    {
        public static async Task SeedData(RestaurantContext context, UserManager<User> userManager)
        {
            await SeedBaseClasses(context);

            await context.SaveChangesAsync();
        }

        private static async Task SeedBaseClasses(RestaurantContext context)
        {
            //if (!context.TestCustomersDB.Any())
            //{
            //    var customers = new List<TestCustomer>()
            //    {
            //       new TestCustomer("Jan", "Jaksis"),
            //       new TestCustomer("Grazyna", "Ze Szczecina"),
            //       new TestCustomer("Mateusz", "Bialy"),
            //       new TestCustomer("Pola", "Testowa"),
            //       new TestCustomer("Basia", "Tortowa")
            //    };
            //    await context.TestCustomersDB.AddRangeAsync(customers);
            //}

            if (!context.CountryStatesDB.Any())
            {
                var customers = new List<CountryState>
                {
                   new CountryState{ StateName = "Jan" },
                   new CountryState{ StateName = "Grazyna" },

                };
                await context.CountryStatesDB.AddRangeAsync(customers);
            }
        }
    }
}
