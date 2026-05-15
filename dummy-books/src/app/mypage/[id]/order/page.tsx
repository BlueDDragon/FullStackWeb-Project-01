'use client';

import styles from "@/app/mypage/[id]/order/order.module.css";
import Empty from "@/components/Empty/Empty";
import OrderList from "@/components/MyPage/Order/OrderList";
import { GetOrders } from "@/utils/orderUtils";

export default function Page() {
    const orders = GetOrders();
    const isOrdersEmpty = (!orders || !Array.isArray(orders) || orders.length === 0);

    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <p className={styles.count}>주문조회</p>
            </div>
            <div className={styles.order_container}>
                {!isOrdersEmpty && orders.reverse().map((order, idx) => <OrderList key={idx} order={order}/>)}
                {isOrdersEmpty && <Empty info="주문한 상품이 없습니다."/>}
            </div>
        </div>
    );
}