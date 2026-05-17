import styles from "@/app/mypage/[id]/wish/wish.module.css"
import WishContent from "@/components/MyPage/Wish/WishContent";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

  return (
    <div>
      <WishContent id={id}/>
    </div>
  )
}