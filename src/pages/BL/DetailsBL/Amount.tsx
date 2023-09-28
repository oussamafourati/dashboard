import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { ToWords } from "to-words";

const styles = StyleSheet.create({
  container: {
    borderTop: "1px dashed #999",
    fontSize: 10,
    marginTop: 2,
    paddingTop: 12,
  },
  amount: {
    borderLeft: "1.5px solid #000000",
    fontSize: 10,
    marginLeft: 4,
    marginTop: 2,
    paddingLeft: 8,
    fontWeight: "bold",
  },
  signature: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
});

interface ChildProps {
  amount: number;
}

const Amount: React.FC<ChildProps> = ({ amount }) => {
  const toWords = new ToWords({
    localeCode: "fr-FR",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Dinar Tunisien",
        plural: "Dinar Tunisien",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });
  let words = toWords.convert(amount);

  return (
    <View style={styles.container}>
      <Text fixed style={{ fontSize: 11, fontWeight: "semibold" }}>
        Arrêtée la présente Bon de Livraison à la somme de :
      </Text>
      <View style={styles.amount}>
        <Text fixed>
          {words} ({amount} DT)
        </Text>
      </View>
      <View style={styles.signature}>
        <Text style={{ fontSize: 10, paddingLeft: 26 }} fixed>
          Signature: _______________________________________________
        </Text>
      </View>
    </View>
  );
};

export default Amount;
