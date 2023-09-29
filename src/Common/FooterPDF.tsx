import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderTop: "1px solid #999",
    display: "flex",
    flexDirection: "row",
    fontSize: 10,
    marginTop: 32,
    paddingTop: 4,
  },
  left: {
    flex: 1,
  },
  right: {
    fontStyle: "italic",
  },
  pageNumber: {
    position: "absolute",

    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
});

function FooterDevis() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        borderTop: "1px dashed #999",
      }}
    >
      <View style={{ flex: 15, alignItems: "center" }}>
        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
          Av. palestine cité ennour 2123 Gafsa
        </Text>
        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
          E-mail:{" "}
          <Text style={{ fontSize: 9, fontWeight: "medium" }}>
            radhouani@gmail.com{" "}
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>
              Tél:
              <Text style={{ fontSize: 9, fontWeight: "medium" }}>
                55022011/ 29778445
              </Text>
            </Text>
          </Text>
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </View>
    </View>
  );
}

export default FooterDevis;
