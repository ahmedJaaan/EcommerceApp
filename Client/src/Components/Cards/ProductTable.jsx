import React from "react";

const ProductTable = ({ order, styles }) => {
  return (
    <div key={order._id} className={styles.table}>
      <table>
        <thead className={styles.thead}>
          <tr>
            <th
              scop="col"
              style={{ background: "transparent", textAlign: "center" }}
            >
              Title
            </th>
            <th
              scop="col"
              style={{ background: "transparent", textAlign: "center" }}
            >
              Price
            </th>
            <th
              scop="col"
              style={{ background: "transparent", textAlign: "center" }}
            >
              Brand
            </th>
            <th
              scop="col"
              style={{ background: "transparent", textAlign: "center" }}
            >
              Color
            </th>
            <th
              scop="col"
              style={{ background: "transparent", textAlign: "center" }}
            >
              Count
            </th>
            <th
              scop="col"
              style={{ background: "transparent", textAlign: "center" }}
            >
              Shipping
            </th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td style={{ textAlign: "center" }}>{p.product.title}</td>
              <td style={{ textAlign: "center" }}>{p.product.price}</td>
              <td style={{ textAlign: "center" }}>{p.product.brand}</td>
              <td style={{ textAlign: "center" }}>{p.color}</td>
              <td style={{ textAlign: "center" }}>{p.count}</td>
              <td style={{ textAlign: "center" }}>{p.product.shipping}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
