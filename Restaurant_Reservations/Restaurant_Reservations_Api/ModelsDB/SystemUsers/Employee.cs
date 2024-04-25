using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsDB.SystemUsers
{
    public class Employee : User
    {
        public DateTime? BirthDate { get; set; }
        public List<EmployeeAddress> EmployeeAdresses { get; set; }
    }
}
