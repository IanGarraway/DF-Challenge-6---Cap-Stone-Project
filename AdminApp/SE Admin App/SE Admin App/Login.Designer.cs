namespace SE_Admin_App
{
    partial class Login
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            loginButton = new Button();
            usernameBox = new TextBox();
            usernameLabel = new Label();
            passwordLabel = new Label();
            passwordBox = new TextBox();
            SuspendLayout();
            // 
            // loginButton
            // 
            loginButton.Location = new Point(158, 144);
            loginButton.Name = "loginButton";
            loginButton.Size = new Size(257, 85);
            loginButton.TabIndex = 0;
            loginButton.Text = "Login";
            loginButton.UseVisualStyleBackColor = true;
            loginButton.Click += loginButton_Click;
            // 
            // usernameBox
            // 
            usernameBox.Location = new Point(224, 66);
            usernameBox.Name = "usernameBox";
            usernameBox.Size = new Size(191, 23);
            usernameBox.TabIndex = 1;
            // 
            // usernameLabel
            // 
            usernameLabel.AutoSize = true;
            usernameLabel.Location = new Point(158, 66);
            usernameLabel.Name = "usernameLabel";
            usernameLabel.Size = new Size(60, 15);
            usernameLabel.TabIndex = 2;
            usernameLabel.Text = "Username";
            // 
            // passwordLabel
            // 
            passwordLabel.AutoSize = true;
            passwordLabel.Location = new Point(158, 95);
            passwordLabel.Name = "passwordLabel";
            passwordLabel.Size = new Size(57, 15);
            passwordLabel.TabIndex = 4;
            passwordLabel.Text = "Password";
            // 
            // passwordBox
            // 
            passwordBox.Location = new Point(224, 95);
            passwordBox.Name = "passwordBox";
            passwordBox.PasswordChar = '*';
            passwordBox.Size = new Size(191, 23);
            passwordBox.TabIndex = 3;
            // 
            // Login
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(597, 339);
            ControlBox = false;
            Controls.Add(passwordLabel);
            Controls.Add(passwordBox);
            Controls.Add(usernameLabel);
            Controls.Add(usernameBox);
            Controls.Add(loginButton);
            Name = "Login";
            Text = "Login";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button loginButton;
        private TextBox usernameBox;
        private Label usernameLabel;
        private Label passwordLabel;
        private TextBox passwordBox;
    }
}