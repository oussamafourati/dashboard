import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Breadcrumb from 'Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import Select from "react-select";

// Import Images
import logoDark from 'assets/images/logo-dark.png'
import logoLight from 'assets/images/logo-light.png'
import { Link } from 'react-router-dom';

const CreateInvoice = () => {

    document.title = "Create Invoice | Toner eCommerce + Admin React Template";

    const [isCurrency, setisCurrency] = useState<any>("$");
    function handleisCurrency(isCurrency: any) {
        setisCurrency(isCurrency);
    }

    const allcurrency = [
        {
            options: [
                { label: "$", value: "($)" },
                { label: "£", value: "(£)" },
                { label: "₹", value: "(₹)" },
                { label: "€", value: "(€)" },
            ],
        },
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Créer Facture" pageTitle="Factures" />

                    <Row className="justify-content-center">
                        <Col xxl={9}>
                            <Card>
                                <Form className="needs-validation" id="invoice_form">
                                    <Card.Body className="border-bottom border-bottom-dashed p-4">
                                        <Row>
                                            <Col lg={4}>
                                                <div className="profile-user mx-auto  mb-3">
                                                    <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                                    <label htmlFor="profile-img-file-input" className="d-block">
                                                        <span className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded" style={{ height: "60px", width: "256px" }}>
                                                            <img src={logoDark} className="card-logo card-logo-dark user-profile-image img-fluid" alt="logo dark" />
                                                            <img src={logoLight} className="card-logo card-logo-light user-profile-image img-fluid" alt="logo light" />
                                                        </span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <div>
                                                        <Form.Label htmlFor="companyAddress" className="form-label">Adresse</Form.Label>
                                                    </div>
                                                    <div className="mb-2">
                                                        <textarea className="form-control" id="companyAddress" placeholder="Taper votre adresse" defaultValue="" />
                                                        <div className="invalid-feedback">
                                                            Adresse
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 mb-lg-0">
                                                        <Form.Control type="text" id="companyaddpostalcode" placeholder="Code Postal" required />
                                                        <div className="invalid-feedback">
                                                            The US zip code must contain 5 digits, Ex. 45678
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="ms-auto">
                                                <div className="mb-2">
                                                    <Form.Control type="text" id="registrationNumber" placeholder="Matricule fiscale" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a registration no, Ex., 012345678912
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <Form.Control type="email" id="companyEmail" placeholder="Adresse e-mail" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a valid email, Ex., example@gamil.com
                                                    </div>
                                                </div>
                                                {/* <div className="mb-2">
                                                    <Form.Control type="text" id="companyWebsite" placeholder="Website" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a website, Ex., www.example.com
                                                    </div>
                                                </div> */}
                                                <div>
                                                    <Form.Control type="number" data-plugin="cleave-phone" id="compnayContactno" placeholder="Contact" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a contact number
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Body className="p-4">
                                        <Row className="g-3">
                                            <Col lg={3} sm={6}>
                                                <Form.Label htmlFor="invoicenoInput">Numero Facture</Form.Label>
                                                <Form.Control type="text" id="invoicenoInput" placeholder="Numero Facture" defaultValue="#VL25000355" />
                                            </Col>
                                            <Col lg={3} sm={6}>
                                                <div>
                                                    <Form.Label htmlFor="date-field">Date</Form.Label>
                                                    <Flatpickr
                                                        className="form-control flatpickr-input"
                                                        placeholder='Selectionner Date'
                                                        options={{
                                                            dateFormat: "d M, Y",
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={3} sm={6}>
                                                <Form.Label htmlFor="choices-payment-status">Status de Payement</Form.Label>
                                                <select className="form-select" data-choices data-choices-search-false id="choices-payment-status" required>
                                                    <option value="">Selectionner Status</option>
                                                    <option value="Paid">Payé</option>
                                                    <option value="Unpaid">Impayé</option>
                                                    <option value="Refund">Rembourser</option>
                                                </select>
                                            </Col>
                                            <Col lg={3} sm={6}>
                                                <div>
                                                    <Form.Label htmlFor="totalamountInput">Montant Total</Form.Label>
                                                    <Form.Control type="number" id="totalamountInput" placeholder="0.00" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Body className="p-4 border-top border-top-dashed">
                                        <Row>
                                            <Col lg={4} sm={6}>
                                                <div>
                                                    <Form.Label htmlFor="billingName" className="text-muted text-uppercase fw-semibold"> Adresse de Facturation</Form.Label>
                                                </div>
                                                <div className="mb-2">
                                                    <Form.Control type="text" id="billingName" placeholder="Nom complet" required />
                                                    <div className="invalid-feedback">
                                                        Taper le nom
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <textarea className="form-control" id="billingAddress" placeholder="Adresse" defaultValue="" />
                                                    <div className="invalid-feedback">
                                                        Please enter a address
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <Form.Control type="number" data-plugin="cleave-phone" id="Contact de facuration" placeholder="50 555 333" required />
                                                    <div className="invalid-feedback">
                                                        Please enter a phone number
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <Form.Control type="text" id="billingTaxno" placeholder="Taxe " required />
                                                    <div className="invalid-feedback">
                                                        Please enter a tax number
                                                    </div>
                                                </div>
                                                {/* <div className="form-check">
                                                    <Form.Check type="checkbox" id="same" name="same" />
                                                    <Form.Label className="form-check-label" htmlFor="same">
                                                        Will your Billing and Shipping address same?
                                                    </Form.Label>
                                                </div> */}
                                            </Col>
                                            {/* <Col sm={6} className="ms-auto">
                                                <Row>
                                                    <Col lg={8}>
                                                        <div>
                                                            <Form.Label htmlFor="shippingName" className="text-muted text-uppercase fw-semibold">Shipping Address</Form.Label>
                                                        </div>
                                                        <div className="mb-2">
                                                            <Form.Control type="text" id="shippingName" placeholder="Full Name" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a full name
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <textarea className="form-control" id="shippingAddress" placeholder="Address" defaultValue="" />
                                                            <div className="invalid-feedback">
                                                                Please enter a address
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <Form.Control type="number" data-plugin="cleave-phone" id="shippingPhoneno" placeholder="(123)456-7890" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a phone number
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Form.Control type="text" id="shippingTaxno" placeholder="Tax Number" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a tax number
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col> */}
                                        </Row>
                                    </Card.Body>
                                    <Card.Body className="p-4">
                                        <div className="table-responsive">
                                            <Table className="invoice-table table-borderless table-nowrap mb-0">
                                                <thead className="align-middle">
                                                    <tr className="table-active">
                                                        <th scope="col" style={{ width: "50px" }}>#</th>
                                                        <th scope="col">
                                                            Details Produit
                                                        </th>
                                                        <th scope="col" style={{ width: "120px" }}>
                                                            <div className="d-flex currency-select input-light align-items-center">
                                                            Prix unitaire
                                                                {/* <Select
                                                                    defaultValue={isCurrency}
                                                                    onChange={handleisCurrency}
                                                                    options={allcurrency}
                                                                    id="choices-payment-currency"
                                                                    className="form-selectborder-0 bg-light"
                                                                /> */}
                                                            </div>
                                                        </th>
                                                        <th scope="col" style={{ width: "120px" }}>Quantité</th>
                                                        <th scope="col" className="text-end" style={{ width: "180px" }}>Montant</th>
                                                        <th scope="col" className="text-end" style={{ width: "105px" }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody id="newlink">
                                                    <tr id="1" className="product">
                                                        <th scope="row" className="product-id">1</th>
                                                        <td className="text-start">
                                                            <div className="mb-2">
                                                                <Form.Control type="text" id="productName-1" placeholder="Nom Produit" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter a product name
                                                                </div>
                                                            </div>
                                                            <textarea className="form-control" id="productDetails-1" placeholder="Détails Produit" defaultValue="" />
                                                        </td>
                                                        <td>
                                                            <Form.Control type="number" className="product-price" id="productRate-1" step="0.01" placeholder="0.00" required />
                                                            <div className="invalid-feedback">
                                                                Please enter a rate
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-step">
                                                                <Button className='minus'>–</Button>
                                                                <input type="number" className="product-quantity" id="product-qty-1" defaultValue="0" />
                                                                <Button className='plus'>+</Button>
                                                            </div>
                                                        </td>
                                                        <td className="text-end">
                                                            <div>
                                                                <Form.Control type="number" className="product-line-price" id="productPrice-1" placeholder="$0.00" />
                                                            </div>
                                                        </td>
                                                        <td className="product-removal">
                                                            <Link to="#" className="btn btn-danger">Supprimer</Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr id="newForm" style={{ display: "none" }}><td className="d-none"><p>Add New Form</p></td></tr>
                                                    <tr>
                                                        <td>
                                                            <Link to="#" id="add-item" className="btn btn-soft-secondary fw-medium"><i className="ri-add-fill me-1 align-bottom"></i> Ajouter élement</Link>
                                                        </td>
                                                    </tr>
                                                    <tr className="border-top border-top-dashed mt-2">
                                                        <td colSpan={3}></td>
                                                        <td className="p-0" colSpan={2}>
                                                            <Table className="table-borderless table-sm table-nowrap align-middle mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">Total</th>
                                                                        <td style={{ width: "150px" }}>
                                                                            <Form.Control type="number" id="cart-subtotal" placeholder="0.00" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Taxe (19%)</th>
                                                                        <td>
                                                                            <Form.Control type="number" id="cart-tax" placeholder="$0.00" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Reduction </th>
                                                                        <td>
                                                                            <Form.Control type="number" id="cart-discount" placeholder="$0.00" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Charge Transport</th>
                                                                        <td>
                                                                            <Form.Control type="number" id="cart-shipping" placeholder="$0.00" />
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="border-top border-top-dashed">
                                                                        <th scope="row">Montant Total</th>
                                                                        <td>
                                                                            <Form.Control type="number" id="cart-total" placeholder="0.00" />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <Row className="mt-3">
                                            <Col lg={4}>
                                                <div className="mb-2">
                                                    <Form.Label htmlFor="choices-payment-type" className="text-muted text-uppercase fw-semibold">Payment Details</Form.Label>
                                                    <select className="form-select" data-choices data-choices-search-false id="choices-payment-type">
                                                        <option value="">Methode de Payement</option>
                                                        <option value="Mastercard">Espèce</option>
                                                        <option value="Credit Card">par chèque</option>
                                                        <option value="Visa">Visa</option>
                                                        
                                                    </select>
                                                </div>
                                                {/* <div className="mb-2">
                                                    <Form.Control type="text" id="cardholderName" placeholder="Card Holder Name" />
                                                </div> */}
                                                {/* <div className="mb-2">
                                                    <Form.Control type="number" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
                                                </div> */}
                                                <div>
                                                    <Form.Control type="number" id="amountTotalPay" placeholder="0.00" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="mt-4">
                                            <Form.Label htmlFor="exampleFormControlTextarea1" className="text-muted text-uppercase fw-semibold">NOTES</Form.Label>
                                            <textarea className="form-control alert alert-warning" id="exampleFormControlTextarea1" placeholder="Notes" defaultValue="Tous les comptes doivent être payés dans les 7 jours suivant la réception de la facture. A régler par chèque ou carte bancaire ou paiement direct en ligne." />
                                        </div>
                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                            <Button variant='success' type="submit"><i className="ri-printer-line align-bottom me-1"></i> Enregister</Button>
                                            <Link to="#" className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1"></i> Telecharger Facture</Link>
                                            {/* <Link to="#" className="btn btn-danger"><i className="ri-send-plane-fill align-bottom me-1"></i> Send Invoice</Link> */}
                                        </div>
                                    </Card.Body>
                                </Form>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
}

export default CreateInvoice;