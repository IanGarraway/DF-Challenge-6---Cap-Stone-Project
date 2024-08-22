using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SE_Admin_App
{
    public partial class Login : Form
    {
        
        private User user;

        public Login()
        {
            InitializeComponent();

            usernameBox.KeyDown += new KeyEventHandler(OnEnterPress);
            passwordBox.KeyDown += new KeyEventHandler(OnEnterPress);


        }

        private void OnEnterPress(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                e.SuppressKeyPress = true;

                loginButton_Click(sender, e);
            }
        }

        private async void loginButton_Click(object sender, EventArgs e)
        {
            
            try
            {
                if (!string.IsNullOrWhiteSpace(usernameBox.Text) && !string.IsNullOrWhiteSpace(passwordBox.Text))
                {
                    HttpResponseMessage response = await AdminService.Login(usernameBox.Text, passwordBox.Text);

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonResponse = await response.Content.ReadAsStringAsync();
                        var loginData = JsonSerializer.Deserialize<LoginResponse>(jsonResponse);

                        if (loginData.admin)
                        {

                            MessageBox.Show(loginData.message);

                            var cookies = AdminService.GetCookies(new Uri("http://127.0.0.1:4000"));
                            string token = "";
                            foreach (var cookie in cookies)
                            {
                                if (cookie.Name == "token")
                                {
                                    // Access the token here                                    
                                    token = cookie.Value;
                                    // Store token securely or use it for future API requests
                                }
                            }
                            user = new User(loginData.admin, true, loginData.username, token);
                            this.Close();
                        }
                        else
                        {
                            MessageBox.Show("Only Admin Accounts have access to this tool");
                        }
                    }
                    else
                    {
                        // Handle error response
                        MessageBox.Show($"Login failed: {response.StatusCode}");
                    }

                }
                else
                {
                    MessageBox.Show("Please enter your username and password.");
                }
            }
            catch (Exception ex)
            {
                // Handle network errors or other unexpected exceptions
                MessageBox.Show($"An error occurred: {ex.Message}");          
            }
                       
        }

        internal User GetUser() { return user; }
    }
}
