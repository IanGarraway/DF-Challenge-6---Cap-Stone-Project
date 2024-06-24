
import ChangePassword from '../components/ChangePassword.jsx';
import DeleteAccount from '../components/DeleteAccount.jsx'


const AccountManagement = ({ user }) => {
    

    return (
        <>
            <div className='accountManagement'>
                <h1>Account Management</h1>
                <hr />
                <ChangePassword />
                <hr />
                <DeleteAccount />
            </div>
        </>
    );
    
}

export default AccountManagement;