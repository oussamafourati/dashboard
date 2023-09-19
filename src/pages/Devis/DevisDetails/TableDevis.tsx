import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Devis } from "features/devis/devisSlice";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    width: "auto",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

interface ChildProps {
  id: number;
}
const TableDevis: React.FC<ChildProps> = ({ id }) => {
  const [clientPhysique, setClientPhysique] = useState<Devis[]>([]);

  useEffect(() => {
    const getClientPhysique = async () => {
      const reqdata = await fetch(
        `http://localhost:8000/devis/ligneventedevis/${id}`
      );
      const resdata = await reqdata.json();
      setClientPhysique(resdata);
    };
    getClientPhysique();
  }, []);

  const mntTotal = clientPhysique.reduce(
    (sum, i) => (sum += parseInt(i.montantDevis!)),
    0
  );

  return (
    <View style={styles.table}>
      <View
        style={[
          styles.tableRow,
          {
            border: 1,
            borderColor: "#D3D3D3",
            borderRadius: 2,
            backgroundColor: "#DCDCDC",
          },
        ]}
      >
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>#</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Details Produit</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Prix Unitaire</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Quantité</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Total</Text>
        </View>
      </View>
      {clientPhysique?.map((lignevente, key) => (
        <View
          style={[
            styles.tableRow,
            { borderBottom: 1, borderBottomColor: "#C0C0C0" },
          ]}
        >
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{key + 1}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{lignevente.productName} </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{lignevente.PU}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{lignevente.quantiteProduit}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}> {lignevente.montantTtl}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TableDevis;
