import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({ orders }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const styleSheet = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      fontSize: 30,
      marginTop: 30,
      textAlign: "center",
      color: "grey",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 20,
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 20,
    },
    table: {
      width: "100%",
      marginBottom: 20,
      border: "1px solid #333",
      borderRadius: 8,
    },
    tableRow: {
      flexDirection: "row",
      alignItems: "center",
      color: "#555",
    },
    tableCell: {
      flex: 1,
      padding: 8,
      fontSize: 12,
      textAlign: "center",
    },
  });

  return (
    <Document>
      {orders.map((order, orderIndex) => (
        <Page key={orderIndex} size={"A4"} style={styleSheet.body}>
          <View>
            <Text style={styleSheet.header}>{formatDate(new Date())}</Text>
            <Text style={styleSheet.title} fixed>
              Order Invoice
            </Text>
            <Text style={styleSheet.author} fixed>
              Mern E-commerce App
            </Text>

            <View style={styleSheet.table}>
              <View style={styleSheet.tableRow}>
                <Text style={styleSheet.tableCell}>Title</Text>
                <Text style={styleSheet.tableCell}>Price</Text>
                <Text style={styleSheet.tableCell}>Brand</Text>
                <Text style={styleSheet.tableCell}>Quantity</Text>
                <Text style={styleSheet.tableCell}>Color</Text>
              </View>
              {order.products.map((product, productIndex) => (
                <View key={productIndex} style={styleSheet.tableRow}>
                  <Text style={styleSheet.tableCell}>
                    {product.product.title}
                  </Text>
                  <Text style={styleSheet.tableCell}>
                    ${product.product.price}
                  </Text>
                  <Text style={styleSheet.tableCell}>
                    {product.product.brand}
                  </Text>
                  <Text style={styleSheet.tableCell}>{product.count}</Text>
                  <Text style={styleSheet.tableCell}>{product.color}</Text>
                </View>
              ))}
            </View>
            <Text style={styleSheet.footer}>~Thanks for shopping with us~</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default Invoice;
