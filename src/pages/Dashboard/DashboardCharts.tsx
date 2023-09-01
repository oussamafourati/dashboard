import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "Common/ChartsDynamicColor";
import {
  useFetchFactureLastMonthQuery,
  useFetchFactureMonthQuery,
  useFetchFacturesJanuaryQuery,
  useFetchfacturesDecemberQuery,
  useFetchfacturesaprilQuery,
  useFetchfacturesaugustQuery,
  useFetchfacturesfebruaryQuery,
  useFetchfacturesjuilletQuery,
  useFetchfacturesjuinQuery,
  useFetchfacturesmarchQuery,
  useFetchfacturesmayQuery,
  useFetchfacturesnovemberQuery,
  useFetchfacturesoctoberQuery,
  useFetchfacturesseptemberQuery,
} from "features/facture/factureSlice";

import {
  useGetArrivageAprQuery,
  useGetArrivageAugQuery,
  useGetArrivageDecQuery,
  useGetArrivageFebQuery,
  useGetArrivageJanQuery,
  useGetArrivageJuinQuery,
  useGetArrivageJulyQuery,
  useGetArrivageMarQuery,
  useGetArrivageMayQuery,
  useGetArrivageNovQuery,
  useGetArrivageOctQuery,
  useGetArrivageSepQuery,
} from "features/arrivage/arrivageSlice";

import {
  useGetAllChargesAprQuery,
  useGetAllChargesAugQuery,
  useGetAllChargesDecQuery,
  useGetAllChargesFebQuery,
  useGetAllChargesJavQuery,
  useGetAllChargesJuinQuery,
  useGetAllChargesJulyQuery,
  useGetAllChargesMarQuery,
  useGetAllChargesMayQuery,
  useGetAllChargesNovQuery,
  useGetAllChargesOctQuery,
  useGetAllChargesSepQuery,
} from "features/charge/chargeSlice";

const RevenueCharts = ({ dataColors, chartData }: any) => {
  var revenueChartColors = getChartColorsArray(dataColors);
  // Facture
  const { data: TotalfactureJanvier = [] } = useFetchFacturesJanuaryQuery();
  const { data: TotalfactureFeb = [] } = useFetchfacturesfebruaryQuery();
  const { data: TotalfactureMar = [] } = useFetchfacturesmarchQuery();
  const { data: TotalfactureApr = [] } = useFetchfacturesaprilQuery();
  const { data: TotalfactureMay = [] } = useFetchfacturesmayQuery();
  const { data: TotalfactureJuin = [] } = useFetchfacturesjuinQuery();
  const { data: TotalfactureJuly = [] } = useFetchfacturesjuilletQuery();
  const { data: TotalfactureAug = [] } = useFetchfacturesaugustQuery();
  const { data: TotalfactureSep = [] } = useFetchfacturesseptemberQuery();
  const { data: TotalfactureOct = [] } = useFetchfacturesoctoberQuery();
  const { data: TotalfactureNov = [] } = useFetchfacturesnovemberQuery();
  const { data: TotalfactureDec = [] } = useFetchfacturesDecemberQuery();

  // Achats ou bien Arrivage
  const { data: TotalAchatJanvier = [] } = useGetArrivageJanQuery();
  const { data: TotalAchatFeb = [] } = useGetArrivageFebQuery();
  const { data: TotalAchatMar = [] } = useGetArrivageMarQuery();
  const { data: TotalAchatApr = [] } = useGetArrivageAprQuery();
  const { data: TotalAchatMay = [] } = useGetArrivageMayQuery();
  const { data: TotalAchatJuin = [] } = useGetArrivageJuinQuery();
  const { data: TotalAchatJuly = [] } = useGetArrivageJulyQuery();
  const { data: TotalAchatAug = [] } = useGetArrivageAugQuery();
  const { data: TotalAchatSep = [] } = useGetArrivageSepQuery();
  const { data: TotalAchatOct = [] } = useGetArrivageOctQuery();
  const { data: TotalAchatNov = [] } = useGetArrivageNovQuery();
  const { data: TotalAchatDec = [] } = useGetArrivageDecQuery();

  // Charges
  const { data: TotalChargeJanvier = [] } = useGetAllChargesJavQuery();
  const { data: TotalChargeFeb = [] } = useGetAllChargesFebQuery();
  const { data: TotalChargeMar = [] } = useGetAllChargesMarQuery();
  const { data: TotalChargeApr = [] } = useGetAllChargesAprQuery();
  const { data: TotalChargeMay = [] } = useGetAllChargesMayQuery();
  const { data: TotalChargeJuin = [] } = useGetAllChargesJuinQuery();
  const { data: TotalChargeJuly = [] } = useGetAllChargesJulyQuery();
  const { data: TotalChargeAug = [] } = useGetAllChargesAugQuery();
  const { data: TotalChargeSep = [] } = useGetAllChargesSepQuery();
  const { data: TotalChargeOct = [] } = useGetAllChargesOctQuery();
  const { data: TotalChargeNov = [] } = useGetAllChargesNovQuery();
  const { data: TotalChargeDec = [] } = useGetAllChargesDecQuery();

  // Vente ou bien Facture
  const venteTotalMonthJanvier = TotalfactureJanvier.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthFeb = TotalfactureFeb.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthMar = TotalfactureMar.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthApr = TotalfactureApr.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthMay = TotalfactureMay.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthJuin = TotalfactureJuin.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthJuly = TotalfactureJuly.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthAug = TotalfactureAug.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthSep = TotalfactureSep.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthOct = TotalfactureOct.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthNov = TotalfactureNov.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  const venteTotalMonthDec = TotalfactureDec.reduce(
    (sum, i) => (sum += i.MontantTotal),
    0
  );

  // Achats ou bien Arrivage
  const achatTotalMonthJanvier = TotalAchatJanvier.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthFeb = TotalAchatFeb.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthMar = TotalAchatMar.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthApr = TotalAchatApr.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthMay = TotalAchatMay.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthJuin = TotalAchatJuin.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthJuly = TotalAchatJuly.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthAug = TotalAchatAug.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthSep = TotalAchatSep.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthOct = TotalAchatOct.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthNov = TotalAchatNov.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  const achatTotalMonthDec = TotalAchatDec.reduce(
    (sum, i) => (sum += parseInt(i.montantTotal)),
    0
  );

  // Charges
  const chargeTotalMonthJanvier = TotalChargeJanvier.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthFeb = TotalChargeFeb.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthMar = TotalChargeMar.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthApr = TotalChargeApr.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthMay = TotalChargeMay.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthJuin = TotalChargeJuin.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthJuly = TotalChargeJuly.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthAug = TotalChargeAug.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthSep = TotalChargeSep.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthOct = TotalChargeOct.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthNov = TotalChargeNov.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const chargeTotalMonthDec = TotalChargeDec.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const series = [
    {
      name: "Charges",
      data: [
        chargeTotalMonthJanvier,
        chargeTotalMonthFeb,
        chargeTotalMonthMar,
        chargeTotalMonthApr,
        chargeTotalMonthMay,
        chargeTotalMonthJuin,
        chargeTotalMonthJuly,
        chargeTotalMonthAug,
        chargeTotalMonthSep,
        chargeTotalMonthOct,
        chargeTotalMonthNov,
        chargeTotalMonthDec,
      ],
    },
    {
      name: "Achats",
      data: [
        achatTotalMonthJanvier,
        achatTotalMonthFeb,
        achatTotalMonthMar,
        achatTotalMonthApr,
        achatTotalMonthMay,
        achatTotalMonthJuin,
        achatTotalMonthJuly,
        achatTotalMonthAug,
        achatTotalMonthSep,
        achatTotalMonthOct,
        achatTotalMonthNov,
        achatTotalMonthDec,
      ],
    },
    {
      name: "Ventes",
      data: [
        venteTotalMonthJanvier,
        venteTotalMonthFeb,
        venteTotalMonthMar,
        venteTotalMonthApr,
        venteTotalMonthMay,
        venteTotalMonthJuin,
        venteTotalMonthJuly,
        venteTotalMonthAug,
        venteTotalMonthSep,
        venteTotalMonthOct,
        venteTotalMonthNov,
        venteTotalMonthDec,
      ],
    },
  ];

  var options: any = {
    chart: {
      height: 405,
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: revenueChartColors,
    markers: {
      size: 0,
      colors: "#ffffff",
      strokeColors: revenueChartColors,
      strokeWidth: 1,
      strokeOpacity: 0.9,
      fillOpacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2, 2],
      curve: "smooth",
    },
    fill: {
      type: ["solid", "gradient", "solid"],
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 0.0,
        stops: [20, 80, 100, 100],
      },
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="line"
        height="405"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const SatisfactionChart = ({ dataColors }: any) => {
  const satisfactionChartsColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Mois en cours",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      name: "Mois Dernier",
      data: [9, 8, 7, 6, 5, 4, 10, 11, 21, 32, 55, 66],
    },
  ];
  var options: any = {
    chart: {
      height: 250,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: ["gradient", "gradient"],
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        inverseColors: false,
        opacityFrom: 0.3,
        opacityTo: 0.0,
        stops: [50, 70, 100, 100],
      },
    },
    markers: {
      size: 4,
      colors: "#ffffff",
      strokeColors: satisfactionChartsColors,
      strokeWidth: 1,
      strokeOpacity: 0.9,
      fillOpacity: 1,
      hover: {
        size: 6,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -35,
        right: 0,
        bottom: 0,
        left: -6,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2],
      curve: "smooth",
    },
    colors: satisfactionChartsColors,
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="240"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const TopCategoriesChart = ({ dataColors }: any) => {
  const topCategoriesChartsColors = getChartColorsArray(dataColors);
  const series = [85, 69, 45, 78];
  var options = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    sparkline: {
      enabled: true,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Ventes",
            formatter: function (w: any) {
              return 2922;
            },
          },
        },
      },
    },
    labels: ["Outillage", "Peinture", "Menuiserie", "Autres"],
    colors: topCategoriesChartsColors,
    legend: {
      show: false,
      fontSize: "16px",
      position: "bottom",
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height="300"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { RevenueCharts, SatisfactionChart, TopCategoriesChart };
