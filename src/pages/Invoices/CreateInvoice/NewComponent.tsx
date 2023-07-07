import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  ArrivageProduit,
  useGetAllArrivagesProduitQuery,
} from "features/arrivageProduit/arrivageProduitSlice";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Produit, useFetchProduitsQuery } from "features/produit/productSlice";

const NewComponent = () => {
  const [inputFields, setInputFields] = useState<string[]>([""]);
  const { data: allProduit = [] } = useFetchProduitsQuery();
  const { data: allArrivageProduit = [] } = useGetAllArrivagesProduitQuery();
  const handleAddFields = () => {
    const newInputFields = [...inputFields];
    newInputFields.push("");
    setInputFields(newInputFields);
  };

  const handleRemoveFields = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const [acValue, setACValue] = useState<Produit | null>(allProduit[0]);

  const [value, setValue] = useState<string>("");

  const [text, setText] = useState("");
  const [products, setProducts] = useState<ArrivageProduit[]>([]);
  const [suggestions, setSuggestions] = useState<ArrivageProduit[]>([]);
  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch(
        "http://localhost:8000/arrivageProduit/allArrivageProduit"
      );
      const resData = await response.json();
      setProducts(resData);
    };
    loadProduct();
  }, []);

  const onSuggestHandler = (text: string) => {
    setText(text);
    setSuggestions([]);
  };
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
    setValue(event.target.value);
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value;
    let matches: ArrivageProduit[] = [];
    if (text.length > 0) {
      matches = products.filter((prd) => {
        const regex = new RegExp(`${text}`, "gi");
        return prd?.nomProduit!.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    stateVal: Produit | null
  ) => {
    event.preventDefault();
    console.log(event);
    console.log(stateVal);
  };

  return (
    <div>
      <Card.Body className="p-4">
        <Row>
          {/* <Col lg={1}>
            <Form.Label htmlFor="invoicenoInput">#</Form.Label>
          </Col> */}
          <Col lg={5}>
            <Form.Label htmlFor="productdetail">Détail Produit</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="PrixUnitaire">Prix Unitaire</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="Quantite">Quantité</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="Montant">Montant</Form.Label>
          </Col>
          <Col lg={1}></Col>
        </Row>
        {inputFields.map((inputField, index) => (
          <Row style={{ marginBottom: 20 }}>
            {/* <Col lg={1}>{index + 1}</Col> */}
            <Col lg={5}>
              {/* <div>
                <Form.Control
                  className="product-price"
                  id="productdetail"
                  type="text"
                  value={text}
                  onChange={onChangeHandler}
                  placeholder="Détail Produit"
                />
              </div>
              {suggestions &&
                suggestions.map((product) => (
                  <div>
                    <ul>
                      <li
                        key={product.idArrivageProduit}
                        style={{ cursor: "pointer" }}
                        onClick={() => onSuggestHandler(product?.nomProduit!)}
                      >
                        {product.nomProduit}__{product.designation}
                      </li>
                    </ul>
                  </div>
                ))} */}

              <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={allProduit}
                autoHighlight
                onChange={(event, value) => setACValue(value)}
                getOptionLabel={(option) => option.nomProduit}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.nomProduit} ({option.idproduit})/{option.marque}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choisir Produit"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    size="small"
                  />
                )}
              />
            </Col>
            <Col lg={2}>
              <TextField
                type="text"
                id="PrixUnitaire"
                placeholder="0.0"
                size="small"
              />
            </Col>
            <Col lg={2}>
              <TextField
                type="text"
                id="Quantite"
                placeholder="0.0"
                size="small"
              />
            </Col>
            <Col lg={2}>
              <TextField
                type="text"
                id="Montant"
                placeholder="0.0 "
                defaultValue=""
                size="small"
              />
            </Col>
            <Col lg={1} style={{ marginTop: 13 }}>
              <Link
                to="#"
                className="link-danger"
                onClick={() => handleRemoveFields(index)}
              >
                <i className="ri-delete-bin-5-line ri-xl" />
              </Link>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Row>
        <Col id="newForm" style={{ display: "none" }}>
          <div className="d-none">
            <p>Add New Form</p>
          </div>
        </Col>
        <Col>
          <div>
            <Link
              to="#"
              id="add-item"
              className="btn btn-soft-secondary fw-medium"
              onClick={handleAddFields}
            >
              <i className="ri-add-fill me-1 align-bottom"></i>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewComponent;
