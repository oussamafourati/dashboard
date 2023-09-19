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
});

function FooterDevis() {
  return (
    <View style={styles.container}>
      <Text style={styles.left}>A & J Paving, Inc.</Text>
      <Text style={styles.right}>
        {`Seal Coating  ·  Striping  ·  Blacktop Paving and Repairs  ·  Insured and Bonded`}
      </Text>
    </View>
  );
}

export default FooterDevis;
