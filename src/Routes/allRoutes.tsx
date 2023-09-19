import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

//Product
import ListView from "pages/Products/ListView";
import GridView from "pages/Products/GridView";
import Overview from "pages/Products/Overview";
import CreateProduct from "pages/Products/CreateProduct";
import Categories from "pages/Products/Categories";
import SubCategories from "pages/Products/SubCategories";

// Calendrier
import Calendar from "pages/Calendar";

// Sellers
import SellersListView from "pages/Sellers/ListView";
import SellersGridView from "pages/Sellers/GridView";
import SellersOverview from "pages/Sellers/Overview";

// Invoice
import InvoiceList from "pages/Invoices/InvoiceList";
import InvoiceDetails from "pages/Invoices/InvoiceDetails";
import CreateInvoice from "pages/Invoices/CreateInvoice";

// User List
import ClientMor from "pages/ClientMor";

// Shipping
import Shipments from "pages/Shipping/Shipments";
import ShippingList from "pages/Shipping/ShippingList";
import CreateArrivageProduit from "pages/Shipping/CreateArrivageProduit";

// Echéances
import EcheanceListTable from "pages/Echeances/EcheanceListTable";

// Coupons
import ClientPhy from "pages/ClientPhy";

//Brands
import Brands from "pages/Charges";

// Accounts
import MyAccount from "pages/Accounts/MyAccount";
import Settings from "pages/Accounts/Settings";
import SignUp from "pages/Accounts/AuthenticationInner/SignUp";
import SignIn from "pages/Accounts/AuthenticationInner/SignIn";
import PasswordReset from "pages/Accounts/AuthenticationInner/PasswordReset";
import PasswordCreate from "pages/Accounts/AuthenticationInner/PasswordCreate";
import SuccessMessage from "pages/Accounts/AuthenticationInner/SuccessMessage";
import TwoStepVerify from "pages/Accounts/AuthenticationInner/TwoStepVerify";
import BasicLogout from "pages/Accounts/AuthenticationInner/Logout";
import Error404 from "pages/Accounts/AuthenticationInner/Error404";
import Error500 from "pages/Accounts/AuthenticationInner/Error500";
import ComingSoon from "pages/Accounts/AuthenticationInner/ComingSoon";

// Authentication
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import Register from "pages/Authentication/Register";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";
import ShippingDetails from "pages/Shipping/ShippingList/ShippingDetails";
import CreateDevis from "pages/Devis/CreateDevis";
import DevisList from "pages/Devis/DevisList";
import PassagerInvoice from "pages/Invoices/CreateInvoice/PassagerInvoice";
import ProInvoice from "pages/Invoices/CreateInvoice/ProInvoice";
import Loading from "Common/Loading";
import DevisDetails from "pages/Devis/DevisDetails";
import ListeBL from "pages/BL/ListeBL";
import DetailsBL from "pages/BL/DetailsBL";
import CreateBL from "pages/BL/CreateBL";

// const authProtectedRoutes = [

// ];

const publicRoutes = [
  // Authentication
  { path: "/tableau_de_bord", component: <Dashboard /> },

  //Product
  { path: "/products-list", component: <ListView /> },
  { path: "/products-grid", component: <GridView /> },
  { path: "/product-overview", component: <Overview /> },
  { path: "/product-create", component: <CreateProduct /> },
  { path: "/categories", component: <Categories /> },
  { path: "/sub-categories", component: <SubCategories /> },

  // Sellers
  { path: "/sellers-list-view", component: <SellersListView /> },
  { path: "/liste-fournisseurs", component: <SellersGridView /> },
  { path: "/detail-fournisseur", component: <SellersOverview /> },

  // Invoice  invoices-list   invoices-details
  { path: "/liste-factures", component: <InvoiceList /> },
  { path: "/details-factures", component: <InvoiceDetails /> },
  { path: "/nouveau-facture-passager", component: <PassagerInvoice /> },
  { path: "/nouveau-facture-pro", component: <ProInvoice /> },

  // Devis
  { path: "/liste-devis", component: <DevisList /> },
  { path: "/details-devis", component: <DevisDetails /> },
  { path: "/nouveau-devis", component: <CreateDevis /> },

  // BL
  { path: "/liste-bl", component: <ListeBL /> },
  { path: "/details-bl", component: <DetailsBL /> },
  { path: "/nouveau-bl", component: <CreateBL /> },

  // ClientMor
  { path: "/client-morale", component: <ClientMor /> },

  // Shipping
  { path: "/nouveau-arrivage", component: <ShippingList /> },
  { path: "/liste-arrivage", component: <Shipments /> },
  { path: "/detail", component: <ShippingDetails /> },
  { path: "/nouveau-arrivage-produit", component: <CreateArrivageProduit /> },

  // ClientPhy
  { path: "/client-physique", component: <ClientPhy /> },

  // Echeances
  { path: "/echeances", component: <EcheanceListTable /> },

  // Calendar
  { path: "/calendrier", component: <Calendar /> },

  //Review & Rating
  { path: "/charges", component: <Brands /> },

  // Accounts
  { path: "/liste-comptes", component: <MyAccount /> },
  { path: "/creer-compte", component: <Settings /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/tableau_de_bord" /> },
  { path: "*", component: <Navigate to="/tableau_de_bord" /> },
  { path: "/profil", component: <UserProfile /> },
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/register", component: <Register /> },
  { path: "/forgot-password", component: <ForgotPassword /> },

  // AuthenticationInner
  { path: "/auth-signup-basic", component: <SignUp /> },
  { path: "/connexion", component: <SignIn /> },
  { path: "/auth-pass-reset-basic", component: <PasswordReset /> },
  { path: "/auth-pass-change-basic", component: <PasswordCreate /> },
  { path: "/auth-success-msg-basic", component: <SuccessMessage /> },
  { path: "/auth-twostep-basic", component: <TwoStepVerify /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-404", component: <Error404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/coming-soon", component: <ComingSoon /> },
];

export { publicRoutes };
