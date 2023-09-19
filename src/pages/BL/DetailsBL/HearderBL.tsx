import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import logoLight from "assets/images/logo-light.png";

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
  date: string;
  numero: string;
}

const HeaderBL: React.FC<ChildProps> = ({ date, numero }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image style={styles.image} src={logoLight} />
      </View>
      <View style={styles.right}>
        <Text style={styles.h1}>
          Bon de Livraison <Text style={styles.num}>N°</Text>:{" "}
          {/* <Text style={styles.h2}>{rowData.designationDevis}</Text> */}
          <Text style={styles.h2}>{numero}</Text>
        </Text>
        <Text style={styles.h1}>
          {/* Date: <Text style={styles.h2}>{rowData.dateDevis}</Text> */}
          Date: <Text style={styles.h2}>{date}</Text>
        </Text>
      </View>
    </View>
  );
};

export default HeaderBL;
