import BreadCrumb from 'Common/BreadCrumb';
import React from 'react';
import { Container, Row } from 'react-bootstrap';

//import Components
import ProductFilter from './ProductFilter';

const ListView = () => {

    document.title = "Liste des Produits | Toner eCommerce + Admin React Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Liste des Produits " pageTitle="Produit" />
                    <Row>
                        <ProductFilter />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ListView;