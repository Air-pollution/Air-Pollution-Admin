import React, { useState, useEffect, useContext } from 'react';
import DataTable from '../controls/tables/DataTable';
import SearchBox from 'components/controls/inputs/SearchBox';
import ButtonExport from 'components/controls/buttons/ButtonExport';
import { PendingApprovalContext } from 'contexts/PendingApprovalContext';
import { GlobalContext } from 'contexts/GlobalContext';
import Swal from 'sweetalert2';
import ButtonDeleteList from 'components/controls/buttons/ButtonDeleteList';
import ButtonApproveList from 'components/controls/buttons/ButtonApproveList';
import { getDatabase, ref, onValue } from 'firebase/database';
const PendingApproval = () => {
    const { setContextType, selectedItems, setSelectedItems } = useContext(GlobalContext);
    const { isDataChange, setDataChange, handleSearchData, handleExportData } = useContext(PendingApprovalContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const database = getDatabase();
            const userRef = ref(database, 'User');
            onValue(userRef, (snapshot) => {
                const users = [];
                snapshot.forEach((childSnapshot) => {
                    const userId = childSnapshot.key;
                    const productID = childSnapshot.val().productID;
                    const userData = { 'User ID': userId, 'Product ID': productID };
                    users.push(userData);
                });
                setData(users);
            });
        };

        fetchData();

    }, []);

    const columns = ['User ID', 'Product ID'];

    useEffect(() => {
        setContextType('pendingApproval');
        setSelectedItems([]);
    }, []);

    useEffect(() => {
        if (isDataChange) {
            setDataChange(false);
        }
    }, [isDataChange, setDataChange]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                handleSearchData(searchTerm);
            }
        }, 500); 

        return () => clearTimeout(timeoutId);
    }, [searchTerm, handleSearchData]);

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between py-5'>
                <div className='flex items-center gap-3'>
                    <SearchBox onSearch={setSearchTerm} />
                    <span className='text-3xl font-extra-light text-gray-400'>|</span>
                    <ButtonDeleteList/>
                    <ButtonApproveList/>
                </div>
                <div className='flex flex-row gap-5'>
                    <ButtonExport onClick={handleExportData} />
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default PendingApproval;
