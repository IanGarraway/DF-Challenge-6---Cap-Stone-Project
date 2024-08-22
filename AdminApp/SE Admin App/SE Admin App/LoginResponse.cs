using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE_Admin_App
{
    public class LoginResponse
    {
        public string message { get; set; }
        public string username { get; set; }
        public bool admin { get; set; } = false;
    }
}
