using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ModelsDB.SystemUsers;

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

        }
    }
}
