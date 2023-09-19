import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontSize: 10,
    marginTop: 16,
    paddingTop: 16,
  },
  signature: {
    display: "flex",
    flexDirection: "row",
    marginTop: 24,
  },
});

function ProposalSignature() {
  return (
    <View style={styles.container}>
      <View style={styles.signature}>
        <Text style={{ fontSize: 10, paddingLeft: 16 }} fixed>
          Signature: _______________________________________________
        </Text>
      </View>
    </View>
  );
}

export default ProposalSignature;
