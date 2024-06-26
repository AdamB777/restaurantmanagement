﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using ModelsDB;
using ModelsDB.SystemUsers;
using System.Diagnostics;

namespace RestaurantDB
{
    public class RestaurantContext : IdentityDbContext<User, Role, int>
    {
        public RestaurantContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TestCustomer> TestCustomersDB { get; set; }
        public DbSet<Customer> CustomersDB { get; set; }
        public DbSet<Employee> EmployeesDB { get; set; }
        public DbSet<Owner> OwnersDB { get; set; }
        public DbSet<SuperAdmin> SuperAdminsDB { get; set; }
        public DbSet<Address> AddressesDB { get; set; }
        public DbSet<CountryState> CountryStatesDB { get; set; }
        public DbSet<EmployeeAddress> EmployeeAddressesDB { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
               .HasIndex(u => new { u.FirstName, u.LastName })
               .HasDatabaseName("IX_FirstNameLastName");
            modelBuilder.Entity<Role>()
               .HasData(
                    new Role { Id = 1, Name = "SuperAdmin", NormalizedName = "SUPERADMIN" },
                    new Role { Id = 2, Name = "Owner", NormalizedName = "OWNER" },
                    new Role { Id = 3, Name = "Employee", NormalizedName = "EMPLOYEE" },
                    new Role { Id = 4, Name = "Customer", NormalizedName = "CUSTOMER" }
    );
            modelBuilder.Entity<IdentityUserLogin<int>>(b =>
            {
                b.HasKey(login => new { login.ProviderKey, login.LoginProvider });
            });
            modelBuilder.Entity<IdentityUserRole<int>>(b =>
            {
                b.HasKey(ur => new { ur.UserId, ur.RoleId });
            });
            modelBuilder.Entity<IdentityUserToken<int>>(b =>
            {
                b.HasKey(ut => new { ut.UserId, ut.LoginProvider, ut.Name });
            });


            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(item => Debug.WriteLine(item));
            // DONE : do usunięcia w wersji produkcyjnej
            optionsBuilder.ConfigureWarnings(w => w.Ignore(SqlServerEventId.SavepointsDisabledBecauseOfMARS));
            base.OnConfiguring(optionsBuilder);
        }
    }
}
