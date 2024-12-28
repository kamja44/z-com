import Trend from "./Trend";
import style from "./trendSection.module.css";

export default function TrendSection() {
  const array = Array(10).fill(null);
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {array.map((item, index) => (
          <Trend key={index} />
        ))}
      </div>
    </div>
  );
}
