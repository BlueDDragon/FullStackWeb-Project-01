import styles from "@/app/mypage/[id]/order/order.module.css";
import OrderContent from "@/components/MyPage/Order/OrderContent";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    return (
        <div>
            <OrderContent id={id}/>
        </div>
    );
}