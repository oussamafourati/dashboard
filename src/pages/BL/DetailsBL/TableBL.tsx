import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { Facture } from "features/facture/factureSlice";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    width: "auto",
    margin: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    // margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

interface ChildProps {
  id: number;
}

const TableBL: React.FC<ChildProps> = ({ id }) => {
  const [clientPhysique, setClientPhysique] = useState<Facture[]>([]);

  useEffect(() => {
    const getClientPhysique = async () => {
      const reqdata = await fetch(
        `https://app.src.smartschools.tn/bl/tousLignesVente/${id}`
      );
      const resdata = await reqdata.json();
      setClientPhysique(resdata);
    };
    getClientPhysique();
  }, []);

  const mntTotal = clientPhysique.reduce(
    (sum, i) => (sum += parseInt(i.montantTtl!)),
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
            borderRadius: 1,
            backgroundColor: "#DCDCDC",
          },
        ]}
      >
        <View style={{ width: "5%" }}>
          <Text style={styles.tableCell}>#</Text>
        </View>
        <View style={{ width: "64%" }}>
          <Text
            style={[styles.tableCell, { fontSize: 12, fontWeight: "bold" }]}
          >
            Désignation
          </Text>
        </View>
        <View style={{ width: "13%" }}>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "right", fontSize: 12, fontWeight: "bold" },
            ]}
          >
            P.U
          </Text>
        </View>
        <View style={{ width: "8%" }}>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "right", fontSize: 12, fontWeight: "bold" },
            ]}
          >
            Qte
          </Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text
            style={[
              styles.tableCell,
              { textAlign: "right", fontSize: 12, fontWeight: "bold" },
            ]}
          >
            Total
          </Text>
        </View>
      </View>
      {clientPhysique?.map((lignevente, key) => (
        <View
          style={[
            styles.tableRow,
            { borderBottom: 1, borderBottomColor: "#C0C0C0" },
          ]}
          break={key > 21}
          wrap={false}
        >
          <View style={{ width: "5%" }}>
            <Text style={styles.tableCell}>{key + 1}</Text>
          </View>
          <View style={{ width: "64%" }}>
            <Text style={styles.tableCell}>{lignevente.productName} </Text>
          </View>
          <View style={{ width: "13%" }}>
            <Text style={[styles.tableCell, { textAlign: "right" }]}>
              {lignevente.PU}
            </Text>
          </View>
          <View style={{ width: "8%" }}>
            <Text style={[styles.tableCell, { textAlign: "right" }]}>
              {lignevente.quantiteProduit}
            </Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={[styles.tableCell, { textAlign: "right" }]}>
              {" "}
              {parseFloat(lignevente?.montantTtl!).toFixed(3)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TableBL;
