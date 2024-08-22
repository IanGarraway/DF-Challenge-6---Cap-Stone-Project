using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE_Admin_App
{
    internal class User
    {
        bool isAdmin = false;
        bool login = false;
        string userName;
        string token;

        public bool IsAdmin() { return isAdmin; }
        public bool Login() { return login; }
        public string GetUserName() { return userName; }
        public string GetToken() { return token; }

        public User(bool isAdmin, bool login, string userName, string token)
        {
            this.isAdmin = isAdmin;
            this.login = login;
            this.userName = userName;
            this.token = token;

        }
    }
}
