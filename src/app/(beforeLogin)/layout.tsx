import { ReactNode } from "react";
import styles from "@/app/page.module.css";

interface ILayout {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: ILayout) {
  return (
    <div className={styles.container}>
      Before login Layout {children}
      {modal}
    </div>
  );
}
