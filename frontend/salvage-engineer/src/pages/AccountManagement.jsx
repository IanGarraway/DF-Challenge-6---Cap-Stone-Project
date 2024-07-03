
import { useEffect } from 'react';
import ChangePassword from '../components/ChangePassword.jsx';
import DeleteAccount from '../components/DeleteAccount.jsx'


const AccountManagement = ({ user, setUser,setBackGroundImg}) => {
    
    
    useEffect(() => {
        setBackGroundImg(`url("backgrounds/background2.png`)
    }, []);
    

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