namespace RestaurantDB
{
    public class Seed
    {
        public static async Task SeedData(RestaurantContext context)
        {


            await context.SaveChangesAsync();
        }
    }
}
