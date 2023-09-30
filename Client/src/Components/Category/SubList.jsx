import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getSubs } from "../../APIs/Sub";
import styles from "./CategoryList.module.css";
import TypewriterEffect from "../Cards/TypewriterEffect";

const SubList = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getSubs().then((c) => {
      setSubs(c);
    });
  }, []);

  const showSubs = () => {
    return (
      <section>
        <div>
          <h4 className={styles.NewArrivals}>
            <TypewriterEffect
              text={[
                "Explore Our Subcategories",
                "Find Exciting Products",
                "Discover More Options",
              ]}
            />
          </h4>
        </div>
        <div className={styles.container}>
          {subs.map((s) => (
            <div key={s._id} className={styles.box}>
              <span className={styles.linkSpan}>
                <NavLink to={`/sub/${s.slug}`} className={styles.link}>
                  {s.name}
                </NavLink>
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return <div>{showSubs()}</div>;
};

export default SubList;
