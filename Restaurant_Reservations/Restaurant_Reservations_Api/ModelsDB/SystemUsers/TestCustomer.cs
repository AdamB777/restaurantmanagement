using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsDB.SystemUsers
{
    public class TestCustomer
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public TestCustomer(string v1, string v2)
        {
            Name = v1;
            LastName = v2;
        }
    }
}
