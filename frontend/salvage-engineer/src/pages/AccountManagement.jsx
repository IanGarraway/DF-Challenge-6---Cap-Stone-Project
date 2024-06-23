
import ChangePassword from '../components/ChangePassword.jsx';
import DeleteAccount from '../components/DeleteAccount.jsx'


const AccountManagement = ({ user }) => {
    

    return (
        <>
            <h1>Account Management</h1>
            <hr />
            <ChangePassword />
            <hr />
            <DeleteAccount />
        </>
    );
    
}

export default AccountManagement;