import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    fontSize: 10,
    marginTop: 16,
    paddingTop: 16,
  },
  h1: {
    fontSize: 13,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 11,
    fontWeight: "medium",
  },
});

interface ChildProps {
  mnt: string;
}

const MontantTotalDevis: React.FC<ChildProps> = ({ mnt }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Montant Total: <Text style={styles.h2}>{mnt}</Text>
      </Text>
    </View>
  );
};

export default MontantTotalDevis;
