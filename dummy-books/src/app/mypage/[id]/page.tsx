import styles from "@/app/mypage/[id]/mypage.module.css"
import MyPageContent from "@/components/MyPage/MyPageContent";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    return (
        <div>
            <MyPageContent id={id}/>
        </div>
    );
}