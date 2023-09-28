import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    // width: "auto",
    borderStyle: "solid",
    border: 1,
    borderRadius: 5,
  },
  tableRow: {
    margin: 1,
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
});

interface ChildProps {
  numero: string;
  date: string;
  nom: string;
  adr: string;
  tel: string;
  matricule: string;
}

const ClientBL: React.FC<ChildProps> = ({
  numero,
  date,
  nom,
  adr,
  matricule,
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
      <View style={{ flex: 1 }}>
        <View style={[styles.table, { border: 1, width: 160 }]}>
          <View style={[styles.tableRow, { borderBottom: 1 }]}>
            <View style={[styles.tableCol, { width: "25%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { padding: 3, fontSize: 12, fontWeight: "extrabold" },
                ]}
              ></Text>
            </View>
            <View style={[styles.tableCol, { width: "55%" }]}>
              <Text
                style={{
                  fontSize: 11.5,
                  fontWeight: "extrabold",
                }}
              >
                Bon de Livraison
              </Text>
            </View>
            <View style={[styles.tableCol, { width: "20%" }]}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "extrabold",
                }}
              ></Text>
            </View>
          </View>
          <View style={[styles.tableRow, { borderBottom: 1 }]}>
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 10, fontWeight: "demibold" },
                ]}
              >
                Numéro
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 10, fontWeight: "demibold" },
                ]}
              >
                Date
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "20%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 10, fontWeight: "demibold" },
                ]}
              >
                Page
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 9, fontWeight: "medium" },
                ]}
              >
                {numero}
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 9, fontWeight: "medium" },
                ]}
              >
                {date}
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "20%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 9, fontWeight: "medium" },
                ]}
                render={({ pageNumber, totalPages }) => `${totalPages}`}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <View style={[styles.table, { border: 1, width: 220, padding: 3 }]}>
          <View style={[styles.tableRow]}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              Client:{" "}
              <Text style={{ fontSize: 10, fontWeight: "medium" }}>{nom}</Text>
            </Text>
          </View>
          <View style={[styles.tableRow]}>
            <View style={[styles.tableCol, { width: "20" }]}>
              <Text style={[styles.tableCell, { marginTop: 0 }]}> </Text>
            </View>
            <View style={[styles.tableCol, { width: "80%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 0, fontSize: 10, fontWeight: "medium" },
                ]}
              >
                {adr}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow]}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              M.F:{" "}
              <Text style={{ fontSize: 10, fontWeight: "medium" }}>
                {matricule}
              </Text>
            </Text>
          </View>
          <View style={[styles.tableRow]}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              Mode Paiement:{" "}
              <Text style={{ fontSize: 10, fontWeight: "medium" }}>Espèce</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClientBL;
