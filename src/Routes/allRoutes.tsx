import { Navigate } from "react-router-dom";

import Dashboard from "pages/Dashboard";

//Product
import ListView from "pages/Products/ListView";
import Overview from "pages/Products/Overview";
import CreateProduct from "pages/Products/CreateProduct";
import Categories from "pages/Products/Categories";
import SubCategories from "pages/Products/SubCategories";

// Sellers
import SellersListView from "pages/Sellers/ListView";
import SellersOverview from "pages/Sellers/Overview";

// Invoice
import InvoiceList from "pages/Invoices/InvoiceList";
import InvoiceDetails from "pages/Invoices/InvoiceDetails";

// User List
import ClientMor from "pages/ClientMor";

// Arrivage
import Shipments from "pages/Shipping/ListArrivage";
import CreateArrivage from "pages/Shipping/CreateArrivage";
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
import PasswordReset from "pages/Accounts/AuthenticationInner/PasswordReset";
import PasswordCreate from "pages/Accounts/AuthenticationInner/PasswordCreate";
import SuccessMessage from "pages/Accounts/AuthenticationInner/SuccessMessage";
import BasicLogout from "pages/Accounts/AuthenticationInner/Logout";

// Authentication
import Login from "../pages/Authentication/Login";
import Logout from "pages/Authentication/Logout";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import UserProfile from "pages/Authentication/user-profile";
import ShippingDetails from "pages/Shipping/CreateArrivage/ArrivageDetails";
import DevisList from "pages/Devis/DevisList";
import PassagerInvoice from "pages/Invoices/CreateInvoice/PassagerInvoice";
import ProInvoice from "pages/Invoices/CreateInvoice/ProInvoice";
import DevisDetails from "pages/Devis/DevisDetails";
import ListeBL from "pages/BL/ListeBL";
import DetailsBL from "pages/BL/DetailsBL";
import CreateBL from "pages/BL/CreateBL";
import UpdateProduct from "pages/Products/UpdateProduct";
import UpdateAccount from "pages/Accounts/Settings/UpdateCompte";
import CreeArrProduitFromList from "pages/Shipping/ListArrivage/CreeArrProduitFromList";
import InvoiceListTable from "pages/Devis/DevisList/InvoiceListTable";
import CreateDevis from "pages/Devis/CreateDevis";

const authProtectedRoutes = [
  // Authentication
  { path: "/tableau_de_bord", component: <Dashboard /> },

  //Product
  { path: "/products-list", component: <ListView /> },
  { path: "/product-overview", component: <Overview /> },
  { path: "/product-create", component: <CreateProduct /> },
  { path: "/modifier-produit", component: <UpdateProduct /> },
  { path: "/categories", component: <Categories /> },
  { path: "/sub-categories", component: <SubCategories /> },

  // Sellers
  { path: "/liste-fournisseurs", component: <SellersListView /> },
  { path: "/detail-fournisseur", component: <SellersOverview /> },

  // Invoice  invoices-list   invoices-details
  { path: "/liste-factures", component: <InvoiceList /> },
  { path: "/details-factures", component: <InvoiceDetails /> },
  { path: "/nouveau-facture-passager", component: <PassagerInvoice /> },
  { path: "/nouveau-facture-pro", component: <ProInvoice /> },

  // Devis
  { path: "/liste-devis", component: <DevisList /> },
  { path: "/details-devis", component: <DevisDetails /> },
  { path: "/nouveau-devis", component: < CreateDevis/> },
  // BL
  { path: "/liste-bl", component: <ListeBL /> },
  { path: "/details-bl", component: <DetailsBL /> },
  { path: "/nouveau-bl", component: <CreateBL /> },

  // ClientMor
  { path: "/client-morale", component: <ClientMor /> },

  // Shipping
  { path: "/nouveau-arrivage", component: <CreateArrivage /> },
  { path: "/liste-arrivage", component: <Shipments /> },
  { path: "/detail", component: <ShippingDetails /> },
  { path: "/nouveau-arrivage-produit", component: <CreateArrivageProduit /> },
  { path: "/arrivage-produit", component: <CreeArrProduitFromList /> },

  // ClientPhy
  { path: "/client-physique", component: <ClientPhy /> },

  // Echeances
  { path: "/echeances", component: <EcheanceListTable /> },

  //Review & Rating
  { path: "/charges", component: <Brands /> },

  // Accounts
  { path: "/liste-comptes", component: <MyAccount /> },
  { path: "/creer-compte", component: <Settings /> },
  { path: "/modifier-compte", component: <UpdateAccount /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/tableau_de_bord" /> },
  { path: "*", component: <Navigate to="/tableau_de_bord" /> },
  { path: "/profil", component: <UserProfile /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgotPassword /> },

  // AuthenticationInner
  { path: "/auth-pass-reset-basic", component: <PasswordReset /> },
  { path: "/auth-pass-change-basic", component: <PasswordCreate /> },
  { path: "/auth-success-msg-basic", component: <SuccessMessage /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
];

export { authProtectedRoutes, publicRoutes };
