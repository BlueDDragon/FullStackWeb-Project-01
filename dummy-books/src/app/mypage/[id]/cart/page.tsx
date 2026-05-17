import styles from "@/app/mypage/[id]/cart/cart.module.css"
import CartContent from "@/components/MyPage/Cart/CartContent";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    return (
      <div>
          <CartContent id={id}/>
      </div>
    );
}