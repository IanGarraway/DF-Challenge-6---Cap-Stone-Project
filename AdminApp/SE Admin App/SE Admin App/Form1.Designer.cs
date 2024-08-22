namespace SE_Admin_App
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            welcomeMessage = new Label();
            allAccountsButton = new Button();
            SuspendLayout();
            // 
            // welcomeMessage
            // 
            welcomeMessage.Location = new Point(134, 9);
            welcomeMessage.Name = "welcomeMessage";
            welcomeMessage.Size = new Size(553, 56);
            welcomeMessage.TabIndex = 0;
            welcomeMessage.Text = "Welcome User";
            welcomeMessage.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // allAccountsButton
            // 
            allAccountsButton.Location = new Point(77, 121);
            allAccountsButton.Name = "allAccountsButton";
            allAccountsButton.Size = new Size(210, 102);
            allAccountsButton.TabIndex = 1;
            allAccountsButton.Text = "See All Accounts";
            allAccountsButton.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(allAccountsButton);
            Controls.Add(welcomeMessage);
            Enabled = false;
            Name = "Form1";
            Text = "Salvage Engineer Admin Tool";
            ResumeLayout(false);
        }

        #endregion

        private Label welcomeMessage;
        private Button allAccountsButton;
    }
}
