using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.UsersDTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool IsSuperAdmin { get; set; } = false;
        public bool IsOwner { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsCustomer { get; set; }
    }
}
