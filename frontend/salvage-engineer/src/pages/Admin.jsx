import React, { useEffect, useState } from "react";
import AdminService from "../service/Admin.Service";
import { Navigate } from "react-router-dom";
import AdminTable from "../components/AdminTable";



const Admin = ({ user, setUser }) => {   

    const [accounts, setAccounts] = useState([]);

    const getAccounts =async () => {
        const accountsData = await AdminService.getData()
        if (accountsData.status === 200) {
            setAccounts(accountsData.data);   
        }
        
    }
    
    useEffect(() => {
        getAccounts();
    }, [])
    

    return (

        <div className="adminPage">            
            <h1 style={{padding: '1rem', borderRadius: "40px"}}>Account Administration</h1>
            <div className="adminTable">
                <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', flexWrap: "wrap", columnCount: "2" }} >
                    <div style={{flex: '1', overflowY: 'auto'}}>
                        <AdminTable accounts={accounts} getAccounts={getAccounts} />
                        </div>
                </div>
            </div>
        </div>
    );
    
}

export default Admin;