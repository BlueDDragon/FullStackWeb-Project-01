import styles from "@/components/MyPage/Order/OrderList.module.css"
import { OrderData } from "@/types/OrderData";
import OrderItem from "./OrderItem";
import { GetOrderId } from "@/utils/orderUtils";

type OrderListProps = {
    order: OrderData;
};

export default function OrderList({ order }: OrderListProps) {
    // 기본 정보
    const orderDate = new Date(order.buyDate);
    const orderId = GetOrderId(orderDate);
    const isPresentType = order.type == "present";
    const isDeliveryComplete = order.state == "buy";

    return (
        <div className={styles.container}>
            <div className={styles.order_info}>
                <p className={styles.date}>{orderDate.toLocaleDateString()} 주문</p>
                <p className={styles.num}>(ORD-{orderId})</p>
                {isPresentType && <p className={styles.type}>선물</p>}
                {isDeliveryComplete && <p className={styles.state}>배송 완료</p>}
            </div>
            <div className={styles.carts_container}>
                {order.carts.map((cart, idx) => <OrderItem key={idx} cart={cart}/>)}
            </div>
            <div className={styles.order_bottom}>
                <p className={styles.key_delivery}>배송비<span className={styles.value_delivery}>{(3000).toLocaleString()}원</span></p>
                <p className={styles.key}>총 결제금액<span className={styles.value}>{order.totalPrice.toLocaleString()}원</span></p>
            </div>
        </div>
    );
}