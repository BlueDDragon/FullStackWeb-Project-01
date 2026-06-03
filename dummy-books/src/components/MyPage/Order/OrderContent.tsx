'use client';

import styles from "@/app/mypage/[id]/order/order.module.css"
import { OrderData } from "@/types/OrderData";
import { GetOrders, IsOrdersEmpty } from "@/utils/orderUtils";
import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import Empty from "@/components/Empty/Empty";
import { useLoginState } from "@/utils/userUtils";
import Link from "next/link";
import LoginGuard from "@/components/LoginGuard";

type OrderContentProps = {
    id: string;
}

export default function OrderContent({ id }: OrderContentProps) {
    const { isLogined, isVerifyId, login } = useLoginState(id);
    
    const [orders, setOrders] = useState<OrderData[]>([]);
    useEffect(() => {
      setOrders(GetOrders().reverse());
    }, []);
    const isOrdersEmpty = IsOrdersEmpty(orders);

    return (
        <LoginGuard isLogined={isLogined} isVerifyId={isVerifyId}>
            <div className={styles.container}>
                <div className={styles.upper}>
                    <p className={styles.count}>주문조회</p>
                </div>
                <div className={styles.order_container}>
                    {!isOrdersEmpty && orders.map((order, idx) => <OrderList key={idx} order={order}/>)}
                    {isOrdersEmpty && <Empty info="주문한 상품이 없습니다."/>}
                </div>
            </div>
        </LoginGuard>
    );
}