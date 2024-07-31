import React from "react";
import AdminTableLine from "./AdminTable/AdminTableLine.jsx";


const AdminTable = ({accounts, getAccounts}) => {
    
    if (accounts.length == 0) { return (<h2>Loading data...</h2>); }

    let accountLines = [];

    accounts.forEach(account => {
        accountLines.push(<AdminTableLine key={account._id}
            account={account}
            getAccounts={getAccounts} />)
        
    });

    return(accountLines)
    
}

export default AdminTable;