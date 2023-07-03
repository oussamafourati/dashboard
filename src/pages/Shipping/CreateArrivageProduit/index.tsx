import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import {
  Produit,
  useAddProduitMutation,
  useFetchProduitsQuery,
} from "features/produit/productSlice";
import Swal from "sweetalert2";
import {
  Arrivage,
  useGetAllArrivagesQuery,
} from "features/arrivage/arrivageSlice";
import {
  ArrivageProduit,
  useAddArrivageProduitMutation,
  useDeleteArrivageProduitMutation,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { Link, useLocation } from "react-router-dom";

const CreateArrivageProduit = () => {
  document.title = "Arrivage | Radhouani";
  const location = useLocation();
  console.log("first: ", location.state);

  const { data: allProduit = [] } = useFetchProduitsQuery();
  const [produit, setProduit] = useState<Produit[]>([]);
  const [selected, setSelected] = useState<Produit[]>([]);
  const [IDproduit, setIDProduit] = useState("");
  useEffect(() => {
    const getProduit = async () => {
      const reqdata = await fetch(
        "http://localhost:8000/product/getAllProducts"
      );
      const resdata = await reqdata.json();
      setProduit(resdata);
    };
    getProduit();
  }, []);
  const handleProduit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const produitId = e.target.value;
    if (produitId !== "") {
      const reqstatedata = await fetch(
        `http://localhost:8000/product/getOneProduct/${produitId}`
      );
      const resstatedata = await reqstatedata.json();
      setSelected(await resstatedata);
      setIDProduit(produitId);
    } else {
      setSelected([]);
    }
  };

  const [prixAchatHT, setPrixAchatHT] = useState<number>(1);
  const [prixAchatTTC, setPrixAchatTTc] = useState<string>("");
  const [prixvente, setPrixVente] = useState<string>("");
  const [benifice, setBenifice] = useState<string>("");
  const [pourcentageBenifice, setPourcentageBenifice] = useState<string>("");
  const [prixRemise, setPrixRemise] = useState<string>("");
  const [pourcentageRemise, setPourcentageRemise] = useState<string>("");

  const onChangePAHT = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixAchatHT(parseInt(event.target.value));
    setPrixAchatTTc((parseInt(event.target.value) * 1.19).toString());
  };
  const onChangePATTC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixAchatTTc(event.target.value);
    setPrixAchatHT(parseInt(event.target.value) / 1.19);
  };

  const onChangePV = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixVente(event.target.value);
    setBenifice(
      (parseInt(event.target.value) - parseInt(prixAchatTTC)).toString()
    );
    setPourcentageBenifice(
      (
        ((parseInt(event.target.value) - parseInt(prixAchatTTC)) * 100) /
        parseInt(event.target.value)
      ).toString()
    );
  };

  const onChangeBenifice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBenifice(event.target.value);
    setPrixVente(
      (parseInt(event.target.value) + parseInt(prixAchatTTC)).toString()
    );
    setPourcentageBenifice(
      (
        (parseInt(event.target.value) * 100) /
        (parseInt(event.target.value) + parseInt(prixAchatTTC))
      ).toString()
    );
  };
  const onChangePourcentageBenifice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPourcentageBenifice(event.target.value);
    setBenifice(
      (
        (parseInt(prixAchatTTC) * parseInt(event.target.value)) /
        (100 - parseInt(event.target.value))
      ).toString()
    );
    setPrixVente(
      (
        (parseInt(prixAchatTTC) * parseInt(event.target.value)) /
          (100 - parseInt(event.target.value)) +
        parseInt(prixAchatTTC)
      ).toString()
    );
  };

  const onChangePrixRemise = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrixRemise(event.target.value);
    setPourcentageRemise(
      (
        ((parseInt(prixvente) - parseInt(event.target.value)) * 100) /
        parseInt(prixvente)
      ).toString()
    );
  };
  const onChangePourcentagePrixRemise = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPourcentageRemise(event.target.value);
    setPrixRemise(
      (
        (parseInt(prixvente) * (100 - parseInt(event.target.value))) /
        100
      ).toString()
    );
  };

  const [CreateArrivageProduit] = useAddArrivageProduitMutation();

  const [arrivageProduitData, setArrivageProduitData] = useState({
    idArrivageProduit: 1,
    produitID: 34,
    arrivageID: location.state.idArrivage,
    quantite: 1,
    prixAchatHt: 1,
    prixAchatTtc: 1,
    prixVente: 1,
    Benifice: 1,
    PourcentageBenifice: 1,
    PrixRemise: 1,
    PourcentageRemise: 1,
    MontantTotalProduit: 1,
    piecejointes: "",
    nomProduit: "",
    designation: "",
    montantTotal: 1,
    dateArrivage: "",
  });

  console.log("arrivageID", arrivageProduitData.arrivageID);

  const onChangeArrivageProduit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivageProduitData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitArrivageProduit = (e: React.FormEvent<HTMLFormElement>) => {
    arrivageProduitData["produitID"] = parseInt(IDproduit);
    arrivageProduitData["prixAchatHt"] = prixAchatHT;
    arrivageProduitData["prixAchatTtc"] = parseInt(prixAchatTTC);
    arrivageProduitData["prixVente"] = parseInt(prixvente);
    arrivageProduitData["Benifice"] = parseInt(benifice);
    arrivageProduitData["PourcentageBenifice"] = parseInt(pourcentageBenifice);
    arrivageProduitData["PrixRemise"] = parseInt(prixRemise);
    arrivageProduitData["PourcentageRemise"] = parseInt(pourcentageRemise);
    arrivageProduitData["MontantTotalProduit"] =
      parseInt(prixAchatTTC) * arrivageProduitData["quantite"];
    e.preventDefault();
    CreateArrivageProduit(arrivageProduitData).then(() =>
      setArrivageProduitData(arrivageProduitData)
    );
  };

  const [modal_AddProduitModals, setmodal_AddProduitModals] =
    useState<boolean>(false);
  function tog_AddProduitModals() {
    setmodal_AddProduitModals(!modal_AddProduitModals);
  }

  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const [deleteArrivageProduit] = useDeleteArrivageProduitMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (id: any) => {
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
          deleteArrivageProduit(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Produit a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Produit est en sécurité :)",
            "error"
          );
        }
      });
  };

  return (
    <React.Fragment>
      <div className="page-content" style={{ marginTop: 20 }}>
        <Container fluid={true}>
          <div className="mx-auto">
            <Card
              id="shipmentsList"
              style={{
                width: 950,
              }}
              className="mx-auto"
            >
              <Card.Body className="mx-auto">
                <Row>
                  <Row>
                    <Col lg={4}>
                      <label htmlFor="statusSelect" className="form-label">
                        Produit
                      </label>
                      <div className="input-group mb-3">
                        <select
                          className="form-select"
                          name="choices-single-default"
                          id="statusSelect"
                          onChange={handleProduit}
                        >
                          <option value="">Nom Produit</option>
                          {allProduit.map((produit) => (
                            <option
                              key={produit.idproduit}
                              value={produit.idproduit}
                            >
                              {produit.nomProduit}
                            </option>
                          ))}
                        </select>
                        <div className="hstack gap-2 justify-content-end">
                          <Button
                            variant="success"
                            id="add-btn"
                            onClick={() => tog_AddProduitModals()}
                            style={{ marginLeft: 5 }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      {/* <div className="input-group mb-3">
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={produit}
                          sx={{ width: 300, height: 80 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Produit"
                            />
                          )}
                        /> */}
                    </Col>
                  </Row>
                  <form
                    onSubmit={onSubmitArrivageProduit}
                    id="formArrivageProduit"
                  >
                    <Row>
                      <Col lg={2} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="quantite">Quantité</Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="text"
                              value={arrivageProduitData.quantite}
                              onChange={onChangeArrivageProduit}
                              id="quantite"
                              placeholder="0"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                            />
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={4} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatHt">
                            Prix d'Achat HT
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={prixAchatHT!}
                              onChange={onChangePAHT}
                              id="prixAchatHt"
                              placeholder="00.00"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                              autoComplete="off"
                            />
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              TVA : 19%
                            </span>
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixAchatTtc">
                            Prix Achat Ttc
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={parseInt(prixAchatTTC)}
                              onChange={onChangePATTC}
                              id="prixAchatTtc"
                              placeholder="00.00"
                              aria-label="Price"
                              aria-describedby="product-price-addon"
                            />
                            <div className="invalid-feedback">
                              Please enter a product price.
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="prixVente">
                            Prix de Vente
                          </Form.Label>
                          <Form.Control
                            type="number"
                            id="prixVente"
                            placeholder="00.00"
                            value={prixvente}
                            onChange={onChangePV}
                            aria-label="discount"
                            aria-describedby="product-discount-addon"
                          />
                          <div className="invalid-feedback">
                            Please enter a product orders.
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="Benifice">Benifice</Form.Label>
                          <Form.Control
                            type="number"
                            id="Benifice"
                            placeholder="00.00"
                            value={parseInt(benifice)}
                            onChange={onChangeBenifice}
                            aria-label="discount"
                            aria-describedby="product-discount-addon"
                          />
                          <div className="invalid-feedback">
                            Please enter a product orders.
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PourcentageBenifice">
                            Benifice %
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              id="PourcentageBenifice"
                              placeholder="0"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                              value={pourcentageBenifice}
                              onChange={onChangePourcentageBenifice}
                            />
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <div className="invalid-feedback">
                              Please enter a product orders.
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PrixRemise">
                            Prix en Remise
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={prixRemise}
                              onChange={onChangePrixRemise}
                              id="PrixRemise"
                              placeholder="00.00"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                            />
                            <div className="invalid-feedback">
                              Please enter a product discount.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={1}></Col>
                      <Col lg={3} sm={6}>
                        <div className="mb-3">
                          <Form.Label htmlFor="PourcentageRemise">
                            Prix en Remise %
                          </Form.Label>
                          <div className="input-group has-validation mb-3">
                            <Form.Control
                              type="number"
                              value={pourcentageRemise}
                              onChange={onChangePourcentagePrixRemise}
                              id="PourcentageRemise"
                              placeholder="0"
                              aria-label="discount"
                              aria-describedby="product-discount-addon"
                              required
                            />
                            <span
                              className="input-group-text"
                              id="product-discount-addon"
                            >
                              %
                            </span>
                            <div className="invalid-feedback">
                              Please enter a product discount.
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={2}></Col>
                      <Col lg={3} style={{ marginTop: 25 }}>
                        <div className="hstack gap-2">
                          <Button
                            variant="success"
                            id="add-btn"
                            type="submit"
                            form="formArrivageProduit"
                          >
                            Ajouter Produit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Card
                        id="shipmentsList"
                        className="mx-auto"
                        // style={{ height: "5.5rem", width: "58.4rem" }}
                      >
                        <Card.Body>
                          <div className="table-responsive">
                            <Table className="table-striped table-borderless align-middle table-nowrap">
                              {/* <Table className="table-striped table-nowrap align-middle mb-0"> */}
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Nom Produit</th>
                                  <th scope="col">prix Achat Ttc</th>
                                  <th scope="col">prix Vente</th>
                                  <th scope="col">Benifice</th>
                                  <th scope="col">Benifice en %</th>
                                  <th scope="col">Remise</th>
                                  <th scope="col">Remise en %</th>
                                  <th scope="col">Quantité</th>
                                  <th scope="col">Prix Total</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {allArrivageProduit.map((produitArr) => {
                                  if (
                                    produitArr.arrivageID ===
                                    location.state.idArrivage
                                  ) {
                                    return (
                                      <tr key={produitArr.idArrivageProduit}>
                                        <td className="fw-medium">
                                          {produitArr.idArrivageProduit}
                                        </td>
                                        <td>{produitArr?.nomProduit!}</td>
                                        <td>{produitArr?.prixAchatTtc!}</td>
                                        <td>{produitArr?.prixVente!}</td>
                                        <td>{produitArr?.Benifice!}</td>
                                        <td>
                                          {produitArr?.PourcentageBenifice!} %
                                        </td>
                                        <td>{produitArr?.PrixRemise!}</td>
                                        <td>
                                          {produitArr?.PourcentageRemise!} %
                                        </td>
                                        <td>{produitArr?.quantite!}</td>
                                        <td>
                                          {produitArr.MontantTotalProduit}
                                        </td>
                                        <td>
                                          <div className="hstack gap-3 fs-15">
                                            <Link
                                              to="#"
                                              className="link-danger"
                                              onClick={() =>
                                                AlertDelete(
                                                  produitArr.idArrivageProduit
                                                )
                                              }
                                            >
                                              <i className="ri-delete-bin-5-line"></i>
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>
                      {/* </Col> */}
                    </Row>
                  </form>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateArrivageProduit;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];
