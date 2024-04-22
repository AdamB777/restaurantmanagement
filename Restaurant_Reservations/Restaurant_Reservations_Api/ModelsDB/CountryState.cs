using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsDB
{
    public class CountryState : BaseModel
    {
        [Key]
        public int Id { get; set; }
        public string StateName { get; set; }
        public List<Address> Addresses { get; set; }
    }
}
