import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderHistoryComponent from "../components/OrderHistory";
//Passing JWT
import authHeader from "../features/auth/authHeader";
import '../styles/OrderHistory.css';
import { FaArrowLeft } from "react-icons/fa";



const OrderHistory = (props) => {

    const [orders, setOrders] = useState({});
    const [sortedOrders, setSortedOrders] = useState({});

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        const getOrders = async () => {
            try {
                const url = "api/orders/" + user.id;
                const response = await fetch(url, authHeader);
                const data = await response.json();
                setOrders(data);

            } catch (err) {
                console.error(err)
            }
        }
        getOrders();

    }, [navigate, user]);


    //https://stackoverflow.com/questions/11731072/dividing-an-array-by-filter-function
    function seperateByActivity(orders, isValid) {
        return orders.reduce(([active, inActive], obj) => {
            return isValid(obj) ? [[...active, obj], inActive] : [active, [...inActive, obj]];
        }, [[], []]);
    }

    useEffect(() => {

        //If orders exist sort array by date and by is activity
        if (!isEmpty(orders)) {
            const [active, inActive] = seperateByActivity(orders, (obj) => obj.isActive === true);
            const sortedArray = formatOrders(active, inActive);

            setSortedOrders(sortedArray);
        }

        function formatOrders(active, inActive) {
            const formatDateActive = setDates(active);
            const formatDateInActive = setDates(inActive);

            formatDateActive.sort(function (a, b) { return new Date(b.dateOrdered) - new Date(a.dateOrdered) });
            formatDateInActive.sort(function (a, b) { return new Date(b.dateOrdered) - new Date(a.dateOrdered) });

            const cleanedArray = formatDateActive.concat(formatDateInActive);
            return cleanedArray;
        }
    }, [orders]);

    function setDates(orders) {
        orders.forEach(function (item, i) {
            var dateObj = new Date(item.dateOrdered);

            var day = dateObj.getDate();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear();

            //https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
            const date = ('0' + month).slice(-2) + "/" + ('0' + day).slice(-2) + "/" + year;
            orders[i].dateOrdered = date;
        })
        return orders;
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    if (isEmpty(sortedOrders)) {

        return (
            <div>
                <div>
                    No order history
                </div>
            </div>
        );

    } else {

        return (

            <div className="OrderHistoryPage">
                <div className="orderSide">
                    <div className="orderHistoryToolBar">
                        <div id="OrderHistory">
                            <div className="backArrow"><div><Link to='/account'><FaArrowLeft /></Link></div></div>
                            <div className="orderHistoryTitle"><h3>Order History</h3></div>
                            <div className="emptyDiv"></div>
                        </div>
                        {sortedOrders.map((order, index) => (
                            <OrderHistoryComponent order={order} menu={props?.menu} restaurants={props?.restaurants} user={user} />
                        ))}
                    </div>
                </div>
            </div>


        );
    }
}

export default OrderHistory;