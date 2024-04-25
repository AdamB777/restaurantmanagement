using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ModelsDB.SystemUsers
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool isAdmin { get; set; }
        public bool isSuperAdmin { get; set; } = false;
        public bool isOwner { get; set; }
        public bool isEmployee { get; set; }
        public bool isCustomer { get; set; }

        public bool isActive { get; set; } = true;
        public DateTime dateAdded { get; set; } = DateTime.Now;
        public DateTime? dateUpdated { get; set; } = null;
        public DateTime? dateDeleted { get; set; } = null;
        public string whoAdded { get; set; }
        public string whoUpdated { get; set; }
        public string whoDeleted { get; set; }
    }
}
