using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace RestaurantDB
{
    public class RestaurantContext:DbContext
    {
        public RestaurantContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(item => Debug.WriteLine(item));
            base.OnConfiguring(optionsBuilder);
        }
    }
}
