import OrderHistoryComponent from "../components/OrderHistory";


const OrderHistory = (props) => {



    return(


        <div className="orderSide">
                    <div className="orderHistoryToolBar">
                        <p id="OrderHistory">Order History</p>
                        {/* Add function to loop through each order */}
                        {/* Issue with rendering */}
                        {/* { orders?.map((p, index) => ( */}
                        
                        <OrderHistoryComponent></OrderHistoryComponent>

                    </div>
                </div>


    );}

    export default OrderHistory;