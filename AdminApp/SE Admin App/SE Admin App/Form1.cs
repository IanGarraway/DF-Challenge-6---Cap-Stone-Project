namespace SE_Admin_App

{
    public partial class Form1 : Form
    {
        User user;
        
        public Form1()
        {
            InitializeComponent();

            Login loginBox = new Login();
            loginBox.ShowDialog();

            user = loginBox.GetUser();

            welcomeMessage.Text = "Welcome "+ user.GetUserName();
        }
       
    }
}
