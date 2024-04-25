using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModelsDB.SystemUsers;

namespace ModelsDB
{
    public class EmployeeAddress : BaseModel
    {
        [Key]
        public int EmployeeAdressId { get; set; }
        public Employee Employee { get; set; }
        public int? EmployeeId { get; set; }
        public AddressType AddressType { get; set; }
    }

    public enum AddressType
    {
        Residence,
        Registration,
        Correspondence
    }
}
