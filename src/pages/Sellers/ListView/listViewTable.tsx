import React, { useMemo, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  Fournisseur,
  useAddFournisseurMutation,
  useDeleteFournisseurMutation,
  useFetchFournisseurQuery,
} from "features/fournisseur/fournisseurSlice";
import Swal from "sweetalert2";

const ListViewTable = () => {
  document.title = "Fournisseur | Radhouani";

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Fournisseur a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (id: number) => {
    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteFournisseur(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Fournisseur a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Fournisseur est en sécurité :)",
            "error"
          );
        }
      });
  };

  const [selectedOption, setSelectedOption] = useState<string>("");
  // This function is triggered when the select changes
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  const [selectedEtat, setSelectedEtat] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedEtat(value);
  };

  const { data = [] } = useFetchFournisseurQuery();
  const [createFournisseur] = useAddFournisseurMutation();
  const [deleteFournisseur] = useDeleteFournisseurMutation();

  const etatActive = data.filter((fournisseur) => fournisseur.etat === 1);
  const etatNonActive = data.filter((fournisseur) => fournisseur.etat === 0);
  const initialFournisseur = {
    idfournisseur: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    type: 0,
    matricule_fiscale: "",
    logo: "",
    rib: "",
    etat: 1,
    piecejointes: "",
  };
  const [formData, setFormData] = useState(initialFournisseur);

  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    type,
    matricule_fiscale,
    logo,
    rib,
    etat,
    piecejointes,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    formData["type"] = parseInt(selectedOption);
    formData["etat"] = parseInt(selectedEtat);
    e.preventDefault();
    createFournisseur(formData).then(() => setFormData(initialFournisseur));
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("logo") as HTMLInputElement
    ).files?.item(0) as File;
    const base64 = await convertToBase64(fileLogo);

    setFormData({
      ...formData,
      raison_sociale,
      adresse,
      tel,
      mail,
      type,
      matricule_fiscale,
      logo: base64 as string,
      rib,
      etat,
      piecejointes,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];
        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: (fournisseur: Fournisseur) => {
          return (
            <div className="d-flex gap-2">
              <div className="flex-shrink-0">
                <img
                  src={`data:image/jpeg;base64, ${fournisseur.logo}`}
                  alt=""
                  className="avatar rounded-2 user-profile-img"
                  width="120"
                />
              </div>
            </div>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Raison sociale",
        accessor: "raison_sociale",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Matricule Fiscale",
        accessor: "matricule_fiscale",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "R.I.B",
        accessor: "rib",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Adresse",
        accessor: "adresse",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Tél",
        accessor: "tel",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (fournisseur: Fournisseur) => {
          return (
            <div className="d-flex gap-2">
              <div>
                <Link
                  to="/detail-fournisseur"
                  className="btn btn-sm btn-soft-secondary"
                  state={fournisseur}
                >
                  Détails
                </Link>
              </div>
              {/* <div className="edit">
                <Link
                  className="btn btn-sm btn-soft-info edit-item-btn"
                  to="#showModal"
                  data-bs-toggle="modal"
                >
                  Edit
                </Link>
              </div> */}
              <div className="remove">
                <Button
                  variant="soft-danger"
                  size="sm"
                  className="remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => AlertDelete(fournisseur.idfournisseur)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <TableContainer
        columns={columns || []}
        data={data || []}
        isGlobalFilter={true}
        iscustomPageSize={false}
        isBordered={false}
        customPageSize={10}
        className="custom-header-css table align-middle table-nowrap"
        tableClassName="table-centered align-middle table-nowrap mb-0"
        theadClassName="text-muted table-light"
        SearchPlaceholder="Rechercher..."
      />
    </React.Fragment>
  );
};

export default ListViewTable;
