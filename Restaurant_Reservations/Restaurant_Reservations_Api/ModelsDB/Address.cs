using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModelsDB.SystemUsers;

namespace ModelsDB
{
    public class Address : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string LocalNo { get; set; }
        public string ZipCode { get; set; }
        public CountryState CountryState { get; set; }
        public int CountryStateId { get; set; }      
        public string Country { get; set; }
        
        public List<Customer> Customers { get; set; }
        public List<EmployeeAddress> EmployeeAdresses { get; set; }
    }
}
