import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import LoginReducer from "../slices/auth/login/reducer";
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";
import { categorySlice } from "../features/category/categorySlice";
import { subCategorySlice } from "features/subCategory/subCategorySlice";
import { produitSlice } from "../features/produit/productSlice";
import { fournisseurSlice } from "../features/fournisseur/fournisseurSlice";
import { clientPhysiqueSlice } from "../features/clientPhysique/clientPhysiqueSlice";
import { chargesSlice } from "../features/charge/chargeSlice";
import { clientMoraleSlice } from "../features/clientMoral/clientMoralSlice";
import { arrivageSlice } from "../features/arrivage/arrivageSlice";
import { facturetSlice } from "features/facture/factureSlice";
import { arrivageProduitSlice } from "features/arrivageProduit/arrivageProduitSlice";
import { compteSlice } from "features/compte/compteSlice";
import { LigneVenteSlice } from "features/ligneVente/ligneVenteSlice";
import { echanceSlice } from "features/Echance/echanceSlice";
import { devisSlice } from "features/devis/devisSlice";
import { notesSlice } from "features/notes/notesSlice";
import { blSlice } from "features/bl/bondeLSlice";
import authReducer from "../features/compte/authSlice";

export const store = configureStore({
  reducer: {
    [categorySlice.reducerPath]: categorySlice.reducer,
    [subCategorySlice.reducerPath]: subCategorySlice.reducer,
    [produitSlice.reducerPath]: produitSlice.reducer,
    [fournisseurSlice.reducerPath]: fournisseurSlice.reducer,
    [clientPhysiqueSlice.reducerPath]: clientPhysiqueSlice.reducer,
    [chargesSlice.reducerPath]: chargesSlice.reducer,
    [clientMoraleSlice.reducerPath]: clientMoraleSlice.reducer,
    [arrivageSlice.reducerPath]: arrivageSlice.reducer,
    [facturetSlice.reducerPath]: facturetSlice.reducer,
    [arrivageProduitSlice.reducerPath]: arrivageProduitSlice.reducer,
    [compteSlice.reducerPath]: compteSlice.reducer,
    [LigneVenteSlice.reducerPath]: LigneVenteSlice.reducer,
    [echanceSlice.reducerPath]: echanceSlice.reducer,
    [devisSlice.reducerPath]: devisSlice.reducer,
    [notesSlice.reducerPath]: notesSlice.reducer,
    [blSlice.reducerPath]: blSlice.reducer,
    auth: authReducer,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      categorySlice.middleware,
      subCategorySlice.middleware,
      produitSlice.middleware,
      fournisseurSlice.middleware,
      clientPhysiqueSlice.middleware,
      chargesSlice.middleware,
      clientMoraleSlice.middleware,
      arrivageSlice.middleware,
      facturetSlice.middleware,
      arrivageProduitSlice.middleware,
      compteSlice.middleware,
      LigneVenteSlice.middleware,
      echanceSlice.middleware,
      devisSlice.middleware,
      notesSlice.middleware,
      blSlice.middleware,
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
