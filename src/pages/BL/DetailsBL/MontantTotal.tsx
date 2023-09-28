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
  mnt: number;
}

const MontantTotal: React.FC<ChildProps> = ({ mnt }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <View style={[styles.table, { border: 1, width: 160 }]}>
          <View style={[styles.tableRow, { borderBottom: 1 }]}>
            <View style={[styles.tableCol, { width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 10, fontWeight: "bold" },
                ]}
              >
                Base
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "20%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 10, fontWeight: "bold" },
                ]}
              >
                TVA%
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 10, fontWeight: "bold" },
                ]}
              >
                TVA
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
                {(mnt / 1.19).toFixed(3)}
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "20%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 9, fontWeight: "medium" },
                ]}
              >
                19.00
              </Text>
            </View>
            <View style={[styles.tableCol, { borderLeft: 1, width: "40%" }]}>
              <Text
                style={[
                  styles.tableCell,
                  { marginTop: 5, fontSize: 9, fontWeight: "medium" },
                ]}
              >
                {(mnt - mnt / 1.19).toFixed(3)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <View style={[styles.table, { border: 1, width: 160, padding: 3 }]}>
          <View style={[styles.tableRow]}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              Total H.T:{" "}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "medium",
                  alignItems: "flex-end",
                }}
              >
                {(mnt / 1.19).toFixed(3)}
              </Text>
            </Text>
          </View>
          <View style={[styles.tableRow]}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              T.V.A:{" "}
              <Text style={{ fontSize: 10, fontWeight: "medium" }}>
                {(mnt - mnt / 1.19).toFixed(3)}
              </Text>
            </Text>
          </View>
          <View style={[styles.tableRow]}>
            <Text style={{ fontSize: 11, fontWeight: "bold" }}>
              Total T.T.C:{" "}
              <Text style={{ fontSize: 10, fontWeight: "medium" }}>{mnt}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MontantTotal;
