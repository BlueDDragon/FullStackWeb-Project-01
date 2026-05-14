import styles from "@/components/MyPage/Order/OrderList.module.css"
import { OrderData } from "@/types/OrderData";
import OrderItem from "./OrderItem";

type OrderListProps = {
    order: OrderData;
};

export default function OrderList({ order }: OrderListProps) {
    return (
        <div className={styles.container}>
            <div className={styles.order_info}>
                <p className={styles.date}>2026. 5. 14. 주문</p>
                <p className={styles.num}>(ORD-112126)</p>
                <p className={styles.state}>{order.state}</p>
            </div>
            <div className={styles.carts_container}>
                {order.carts.map((cart, idx) => <OrderItem key={idx} cart={cart}/>)}
            </div>
            <div className={styles.order_bottom}>
                <p className={styles.key}>총 결제금액<span className={styles.value}>{order.totalPrice}원</span></p>
            </div>
        </div>
    );
}