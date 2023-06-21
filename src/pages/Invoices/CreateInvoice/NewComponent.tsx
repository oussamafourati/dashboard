import React, { useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { ArrivageProduit } from "features/arrivageProduit/arrivageProduitSlice";
import { Link } from "react-router-dom";

const NewComponent = () => {
  const [inputFields, setInputFields] = useState<string[]>([""]);

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

  const [value, setValue] = useState<string>("");
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = event.target.value;
    setInputFields(newInputFields);
    setValue(event.target.value);
  };

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
  return (
    <div>
      <Card.Body className="p-4">
        <Row>
          <Col lg={1}>
            <Form.Label htmlFor="invoicenoInput">#</Form.Label>
          </Col>
          <Col lg={3}>
            <Form.Label htmlFor="date-field">Détail Produit</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="invoicenoInput">Prix Unitaire</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="invoicenoInput">Quantité</Form.Label>
          </Col>
          <Col lg={2}>
            <Form.Label htmlFor="invoicenoInput">Montant</Form.Label>
          </Col>
          <Col lg={2}></Col>
        </Row>
        {inputFields.map((inputField, index) => (
          <Row style={{ marginBottom: 20 }}>
            <Col lg={1}>{index + 1}</Col>
            <Col lg={3}>
              <div>
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
                ))}
            </Col>
            <Col lg={2}>
              <Form.Control type="text" id="invoicenoInput" placeholder="0.0" />
            </Col>
            <Col lg={2}>
              <Form.Control type="text" id="invoicenoInput" placeholder="0.0" />
            </Col>
            <Col lg={2}>
              <Form.Control
                type="text"
                id="invoicenoInput"
                placeholder="0.0 "
                defaultValue=""
              />
            </Col>
            <Col lg={2}>
              <Link
                onClick={() => handleRemoveFields(index)}
                to="#"
                className="btn btn-danger"
              >
                Supprimer
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
              Ajouter élement
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewComponent;
