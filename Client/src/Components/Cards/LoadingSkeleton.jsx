import { Card, Skeleton } from "antd";
import React from "react";
import styles from "../../Styles/cards.module.css";

const LoadingSkeleton = ({ count }) => {
  const generateRows = () => {
    const totalRows = [];
    const cardsPerRow = 3;

    for (let i = 0; i < count; i += cardsPerRow) {
      const row = [];

      for (let j = 0; j < cardsPerRow; j++) {
        row.push(
          <div key={i + j} className={styles["row-card"]}>
            <Card>
              <Skeleton active />
            </Card>
          </div>,
        );
      }

      totalRows.push(
        <div key={i} className={styles["card-row"]}>
          {row}
        </div>,
      );
    }

    return totalRows;
  };

  return <div className={styles["loading-skeleton"]}>{generateRows()}</div>;
};

export default LoadingSkeleton;
