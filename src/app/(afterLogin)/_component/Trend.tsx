import Link from "next/link";
import style from "./trend.module.css";

export default function Trend() {
  return (
    <Link href={`/search?q=감자`} className={style.container}>
      <div className={style.count}>실시간트랜드</div>
      <div className={style.title}>감자</div>
      <div className={style.count}>1234 posts</div>
    </Link>
  );
}
