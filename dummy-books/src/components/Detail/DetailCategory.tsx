import styles from "@/components/Detail/DetailCategory.module.css"

type DetailCategoryProps = {
    category: string;
}

export default function DetailCategory({ category }: DetailCategoryProps) {
    const categorys = category.split('>');
    const isCategoryEmpty = (!category || category.length === 0);

    if (isCategoryEmpty) {
        return (
            <div className={styles.category_container}>
            <span className={styles.category_mainline}>/</span>
            <span className={styles.category_maintitle}> 카테고리 </span>
            <span className={styles.category_subline}>/</span>
            <span className={styles.category_subtitme}> 미지정 </span>
            </div>
        );
    }

    return (
        <div className={styles.category_container}>
            <span className={styles.category_mainline}>/</span>
            <span className={styles.category_maintitle}> 카테고리 </span>
            {categorys.map((c, idx) => <div key={idx}>
                <span className={styles.category_subline}>/</span>
                <span className={styles.category_subtitme}> {c} </span>
            </div>)}
        </div>
    );
}