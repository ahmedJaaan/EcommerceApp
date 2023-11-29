import React from "react";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterBySub = ({
  subs,
  handleSub,
  styles,
  toggleSubsVisibility,
  isSubsVisible,
}) => {
  return (
    <>
      <button onClick={toggleSubsVisibility} className={styles.button}>
        <LiaNetworkWiredSolid /> Filter By SubCategory
        <span
          className={`${styles.dropdownIcon} ${
            isSubsVisible ? styles.inverted : ""
          }`}
        >
          <RiArrowDropDownLine size={30} />
        </span>
      </button>
      <ul
        className={`${styles.list} ${
          isSubsVisible
            ? styles["slide-in-out"]
            : `${styles["slide-in-out"]} ${styles.hidden}`
        }`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 0,
        }}
      >
        {subs &&
          subs.map((s) => (
            <li
              className={`${styles.listItem} ${styles.listItemCategory}`}
              key={s._id}
            >
              <div
                onClick={() => handleSub(s)}
                style={{
                  cursor: "pointer",
                  background: "#f8f2f2",
                  padding: "10px",
                  height: "auto",
                  borderRadius: "10px",
                }}
              >
                {s.name}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default FilterBySub;
