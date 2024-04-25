using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsDB.SystemUsers
{
    public class Customer : User
    {
        public Address DeliveryAddress { get; set; }
        public int? AddressId { get; set; } = null;
    }
}
