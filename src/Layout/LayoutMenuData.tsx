import React, { useEffect, useState } from "react";

const Navdata = () => {
  //state data
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isSellers, setIsSellers] = useState(false);
  const [isInvoice, setIsInvoice] = useState(false);
  const [isDevis, setIsDevis] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Ecommerce") {
      setIsEcommerce(false);
    }
    if (iscurrentState !== "Sellers") {
      setIsSellers(false);
    }
    if (iscurrentState !== "Invoice") {
      setIsInvoice(false);
    }
    if (iscurrentState !== "Devis") {
      setIsDevis(false);
    }
    if (iscurrentState !== "Shipping") {
      setIsShipping(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
  }, [iscurrentState, isEcommerce, isInvoice, isDevis, isShipping, isAuth]);

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: "bi bi-speedometer2",
      link: "/tableau_de_bord",
    },
    {
      id: "invoice",
      label: "Facturation",
      icon: "bi bi-file-earmark-post",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsInvoice(!isInvoice);
        setIscurrentState("Invoice");
        updateIconSidebar(e);
      },
      stateVariables: isInvoice,
      subItems: [
        {
          id: "createinvoice",
          label: "Créer facture",
          link: "/nouveau-facture",
          parentId: "invoice",
        },
        {
          id: "listview",
          label: "Liste des factures",
          link: "/invoices-list",
          parentId: "invoice",
        },
      ],
    },
    {
      id: "devis",
      label: "Devis",
      icon: "bi bi-wallet2",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsDevis(!isDevis);
        setIscurrentState("Devis");
        updateIconSidebar(e);
      },
      stateVariables: isDevis,
      subItems: [
        {
          id: "createdevis",
          label: "Créer Devis",
          link: "/nouveau-devis",
          parentId: "devis",
        },
        {
          id: "listview",
          label: "Liste des devis",
          link: "/liste-devis",
          parentId: "devis",
        },
      ],
    },
    {
      id: "brands",
      label: "Charge",
      icon: "bi bi-currency-dollar",
      link: "/charges",
    },
    {
      id: "seller",
      label: "Fournisseur",
      icon: "bi bi-person-vcard-fill",
      link: "/liste-fournisseurs",
    },
    {
      id: "userslist",
      label: "Client morale",
      icon: "bi bi-buildings-fill",
      link: "/client-morale",
    },
    {
      id: "coupons",
      label: "Client physique",
      icon: "bi bi-person-bounding-box",
      link: "/client-physique",
    },
    {
      id: "shipping",
      label: "Arrivage",
      icon: "bi bi-truck",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsShipping(!isShipping);
        setIscurrentState("Shipping");
        updateIconSidebar(e);
      },
      stateVariables: isShipping,
      subItems: [
        {
          id: "shippinglist",
          label: "Créer Arrivage",
          link: "/nouveau-arrivage",
          parentId: "shipping",
        },
        {
          id: "shipments",
          label: "Liste Arrivage",
          link: "/liste-arrivage",
          parentId: "shipping",
        },
      ],
    },
    {
      id: "products",
      label: "Produit",
      icon: "bi bi-box-seam",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsEcommerce(!isEcommerce);
        setIscurrentState("Ecommerce");
        updateIconSidebar(e);
      },
      stateVariables: isEcommerce,
      subItems: [
        {
          id: "listview",
          label: "Liste des produits",
          link: "/products-list",
          parentId: "products",
        },
        {
          id: "createproduct",
          label: "Créer produit",
          link: "/product-create",
          parentId: "products",
        },
        {
          id: "categories",
          label: "Categorie",
          link: "/categories",
          parentId: "products",
        },
        {
          id: "subcategories",
          label: "Sous-categorie",
          link: "/sub-categories",
          parentId: "products",
        },
      ],
    },
    {
      id: "calendar",
      label: "Calendrier",
      icon: "bi bi-calendar-week",
      link: "/calendrier",
    },

    {
      id: "accounts",
      label: "Compte",
      icon: "bi bi-person-circle",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("Auth");
        updateIconSidebar(e);
      },
      stateVariables: isAuth,
      subItems: [
        {
          id: "monCompte",
          label: "Liste des comptes",
          link: "/liste-comptes",
          parentId: "account",
        },
        {
          id: "settings",
          label: "Créer Compte",
          link: "/creer-compte",
          parentId: "account",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
