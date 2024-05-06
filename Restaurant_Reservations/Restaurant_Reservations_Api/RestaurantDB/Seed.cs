using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ModelsDB;
using ModelsDB.SystemUsers;

namespace RestaurantDB
{
    public class Seed
    {
        public static async Task SeedData(RestaurantContext context, UserManager<User> userManager)
        {
            await SeedBaseClasses(context, userManager);

            await context.SaveChangesAsync();
        }

        private static async Task SeedBaseClasses(RestaurantContext context, UserManager<User> userManager)
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

            #region Users

            //***********************************************OWNER************************

            if (!userManager.Users.Any())
            {
                var superAdmin = new Owner
                {
                    UserName = "darth.vader@example.com",
                    FirstName = "Darth",
                    LastName = "Vader",
                    Email = "darth.vader@example.com",
                    PhoneNumber = "1111111111",
                    isOwner = true,
                    isEmployee = false,
                    isSuperAdmin = false,
                    isCustomer = false,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(superAdmin, "Pa$$w0rd5555555554!");

                //***********************************************SUPERADMIN************************

                var admin = new SuperAdmin
                {
                    UserName = "jannzz.kowalski@example.com",
                    FirstName = "Janusz",
                    LastName = "Kowalski",
                    Email = "jannzz.kowalski@example.com",
                    PhoneNumber = "500100200",
                    isOwner = false,
                    isEmployee = false,
                    isSuperAdmin = true,
                    isCustomer = false,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(admin, "Pa$$w0rd5555555554!");

                //***********************************************EMPLOYEE************************
                var patient1 = new Employee
                {
                    UserName = "tomasz.zielinski@example.com",
                    FirstName = "Tomasz",
                    LastName = "Zieliński",
                    Email = "tomasz.zielinski@example.com",
                    PhoneNumber = "500600700",
                    isOwner = false,
                    isEmployee = true,
                    isSuperAdmin = false,
                    isCustomer = false,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(patient1, "Pa$$w0rd5555555554!");

                var patient2 = new Employee
                {
                    UserName = "aleksandra.nowak@example.com",
                    FirstName = "Aleksandra",
                    LastName = "Nowak",
                    Email = "aleksandra.nowak@example.com",
                    PhoneNumber = "501601701",
                    isOwner = false,
                    isEmployee = true,
                    isSuperAdmin = false,
                    isCustomer = false,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(patient2, "Pa$$w0rd5555555554!");

                var patient3 = new Employee
                {
                    UserName = "piotr.kowal@example.com",
                    FirstName = "Piotr",
                    LastName = "Kowal",
                    Email = "piotr.kowal@example.com",
                    PhoneNumber = "502602702",
                    isOwner = false,
                    isEmployee = true,
                    isSuperAdmin = false,
                    isCustomer = false,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(patient3, "Pa$$w0rd5555555554!");


                //*********************************************** CUSTOMER ************************

                var customer = new Customer
                {
                    UserName = "jacenty@example.com",
                    FirstName = "Jacek",
                    LastName = "Blabla",
                    Email = "jacenty@example.com",
                    PhoneNumber = "5496215776",
                    isOwner = false,
                    isEmployee = false,
                    isSuperAdmin = false,
                    isCustomer = true,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(customer, "Pa$$w0rd5555555554!");

                var customer2 = new Customer
                {
                    UserName = "grazyna123@example.com",
                    FirstName = "Grazyna",
                    LastName = "ZeSzczecina",
                    Email = "grazyna.zeszczecina@example.com",
                    PhoneNumber = "111243212",
                    isOwner = false,
                    isEmployee = false,
                    isSuperAdmin = false,
                    isCustomer = true,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(customer2, "Pa$$w0rd5555555554!");

                var customer3 = new Customer
                {
                    UserName = "meus@example.com",
                    FirstName = "Paul",
                    LastName = "Wesley",
                    Email = "paul.wesley@example.com",
                    PhoneNumber = "24284456",
                    isOwner = false,
                    isEmployee = false,
                    isSuperAdmin = false,
                    isCustomer = true,
                    EmailConfirmed = true
                };
                await userManager.CreateAsync(customer3, "Pa$$w0rd5555555554!");

            }

            await context.SaveChangesAsync();

            #endregion
        }
    }
}
