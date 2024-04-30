import React, { useState, useEffect } from 'react';
import ButtonDashboard from '../controls/buttons/ButtonDashboard';
import BarChart from '../controls/charts/BarChart';
import PieChart from '../controls/charts/PieChart';
import { db, onValue, ref } from '../../utils/firebase'; 

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDatas, setTotalDatas] = useState(0);
    const [productNames, setProductNames] = useState([]);

    useEffect(() => {
        const productsRef = ref(db, 'Product');
        const unsubscribe = onValue(productsRef, (snapshot) => {
            let count = 0;
            const names = [];
            snapshot.forEach((childSnapshot) => {
                count++;
                names.push(childSnapshot.key);
            });
            setTotalProducts(count);
            setProductNames(names);
            console.log('Product names:', productNames)
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const usersRef = ref(db, 'User');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            let count = 0;
            snapshot.forEach(() => {
                count++;
            });
            setTotalUsers(count);
        });
        return unsubscribe;
    }, []);




    useEffect(() => {
        const productsRef = ref(db, 'Product');
        const unsubscribe = onValue(productsRef, (snapshot) => {
            let count = 0;
            let totalKeys = 0; 
            const productNames = [];
            snapshot.forEach((productSnapshot) => {
                count++;
                productNames.push(productSnapshot.key);
                let productCount = 0; 
                productSnapshot.forEach((productNameSnapshot) => {
                    productCount++;
                    productNameSnapshot.forEach(() => {
                        totalKeys++; 
                    });
                });
                console.log(`Total keys in ${productSnapshot.key}:`, productCount);
            });
            setTotalProducts(count);
            setTotalDatas(totalKeys); 
            setProductNames(productNames);
        });
        return unsubscribe;
    }, []);




    const buttons = [
        { title: 'Total Users', icon: 'ri-user-3-line', number: totalUsers, color: 'pink' },
        { title: 'Total Products', icon: 'ri-shopping-cart-line', number: totalProducts, color: 'blue' },
        { title: 'Total Admins', icon: 'ri-admin-line', number: 2, color: 'purple' },
        { title: 'Total Data', icon: 'ri-database-line', number: totalDatas, color: 'green' }
    ];

    const labelsBarChart = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataBarChart = [22, 19, 57, 5, 2, 3, 20, 12, 55, 60, 12, 25];

    const labelPieChart = ['Male', 'Female', 'Others'];
    const dataPieChart = [57, 29, 17];

    return (
        <div className='flex-shrink max-w-full w-full'>
            <div className='text-xl font-bold ml-1 py-5'>Statistics</div>
            <div className='flex items-center justify-between gap-10'>
                {buttons.map((button, index) => <ButtonDashboard key={index} {...button} />)}
            </div>
            <div className='text-xl font-bold ml-1 py-5'>Charts</div>
            <div className='2xl:flex 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-12'>
                <BarChart data={dataBarChart} labels={labelsBarChart} />
                <PieChart data={dataPieChart} labels={labelPieChart} />
            </div>
        </div>
    );
};


export default Dashboard;
