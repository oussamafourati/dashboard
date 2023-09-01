import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchCategoriesQuery } from "features/category/categorySlice";

const ProductCategoryFilter = () => {
  const { data = [] } = useFetchCategoriesQuery();

  return (
    <React.Fragment>
      <Accordion flush defaultActiveKey="0" className="filter-accordion">
        <Card.Body className="border-bottom">
          <div>
            <p className="text-muted text-uppercase fs-13 mb-3">Categories</p>
            <ul className="list-unstyled mb-0 filter-list">
              {data.map((category) => (
                <li key={category.idcategory}>
                  <Link to="#" className="d-flex py-1 align-items-center">
                    <div className="flex-grow-1">
                      <h6 className="mb-0 listname">{category.nom}</h6>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card.Body>

        {/* <Card.Body className="border-bottom">
          <p className="text-muted text-uppercase fs-12 fw-medium mb-4">Prix</p>

          <Nouislider
            range={{ min: 0, max: 2000 }}
            start={[mincost, maxcost]}
            connect
            onSlide={onUpdate}
            data-slider-color="info"
            id="product-price-range"
          />
          <div className="formCost d-flex gap-2 align-items-center mt-3">
            <input
              type="text"
              className="form-control form-control-sm"
              id="MinCost"
              value={mincost}
              onChange={(e: any) => setMincost(e.target.value)}
            />
            <span className="fw-semibold text-muted">à</span>
            <input
              className="form-control form-control-sm"
              type="text"
              id="maxCost"
              value={maxcost}
              onChange={(e: any) => setMaxcost(e.target.value)}
            />
          </div>
        </Card.Body> */}

        {/* ProductSelectColor */}
        {/* <Accordion.Item eventKey="0">
                    <ProductSelectColor />
                </Accordion.Item> */}

        {/* ProductSize */}
        {/* <ProductSize /> */}

        {/* ProductDiscount */}
        {/* <ProductDiscount /> */}

        {/* ProductRating */}
        {/* <ProductRating /> */}
      </Accordion>
    </React.Fragment>
  );
};

export default ProductCategoryFilter;
