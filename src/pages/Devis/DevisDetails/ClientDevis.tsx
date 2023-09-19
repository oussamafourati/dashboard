import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    paddingBottom: 16,
  },
  h1: {
    fontSize: 14,
    fontWeight: 600,
  },
  h2: {
    fontSize: 10,
    fontWeight: "medium",
  },
  left: {
    flex: 1,
  },
  right: {
    // textAlign: 'right',
  },
  image: {
    width: 140,
    border: 3,
    borderStyle: "dashed",
  },
  num: {
    fontWeight: "thin",
    fontSize: 9,
  },
});

interface ChildProps {
  nom: string;
}
const ClientDevis: React.FC<ChildProps> = ({ nom }) => {
  return (
    <View
      style={{
        ...styles.container,
        borderBottom: "1px solid #aaa",
        borderStyle: "dashed",
        marginTop: 8,
        marginLeft: 4,
        paddingLeft: 8,
      }}
    >
      <View style={styles.left}>
        <Text style={styles.h1}>
          Matricule Fiscale: <Text style={styles.h2}>147852369</Text>
        </Text>
        <Text style={styles.h1}>
          Adresse: <Text style={styles.h2}>Cite Ennour, Gafsa 2123, Gafsa</Text>
        </Text>
        <Text style={styles.h1}>
          Tél: <Text style={styles.h2}>76001002</Text>
        </Text>
        <Text style={styles.h1}>
          Email: <Text style={styles.h2}>radhouani@gmail.com</Text>
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.h1}>Délivrer à : </Text>
        <Text style={styles.h2}>{nom}</Text>
        <Text style={styles.h2}>Gafsa</Text>
        <Text style={styles.h2}>26823569</Text>
      </View>
    </View>
  );
};

export default ClientDevis;
