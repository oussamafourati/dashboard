import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import CountUp from "react-countup";
import InvoiceListTable from "./InvoiceListTable";
import {
  useFetchDayDevisQuery,
  useFetchMonthDevisQuery,
  useFetchWeekDevisQuery,
  useFetchYearDevisQuery,
} from "features/devis/devisSlice";

const DevisList = () => {
  document.title = "Liste des devis | Radhouani";

  const { data: AllYearDevis = [] } = useFetchYearDevisQuery();

  const { data: AllMonthDevis = [] } = useFetchMonthDevisQuery();

  const { data: AllWeekDevis = [] } = useFetchWeekDevisQuery();

  const { data: AllDayDevis = [] } = useFetchDayDevisQuery();

  let yearDevis = AllYearDevis.reduce(
    (sum, i) => (sum += parseInt(i.montantDevis)),
    0
  );
  let monthDevis = AllMonthDevis.reduce(
    (sum, i) => (sum += parseInt(i.montantDevis)),
    0
  );
  let weekDevis = AllWeekDevis.reduce(
    (sum, i) => (sum += parseInt(i.montantDevis)),
    0
  );
  let dayDevis = AllDayDevis.reduce(
    (sum, i) => (sum += parseInt(i.montantDevis)),
    0
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Liste des Devis" pageTitle="Devis" />
          <Row>
            <Col>
              <Card className="shadow-sm border-0 overflow-hidden card-animate">
                <div className="position-absolute end-0 start-0 top-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // Xmlns:Xlink="http://www.w3.org/1999/xlink"

                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1571")' fill="none">
                      <path
                        d="M306 65L446 -75"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1561)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M399 2L315 86"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M83 77L256 -96"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M281 212L460 33"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M257 62L76 243"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M305 123L214 214"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1561)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M327 222L440 109"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1561)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M287 109L362 34"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M259 194L332 121"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M376 186L240 322"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M308 153L123 338"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1562)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M218 62L285 -5"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1561)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1571">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1561"
                      >
                        <stop
                          stopColor="rgba(var(--tb-secondary-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-secondary-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1562"
                      >
                        <stop
                          stopColor="rgba(var(--tb-secondary-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-secondary-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-shrink-0 avatar-sm">
                      <div className="avatar-title bg-secondary-subtle text-secondary fs-2 rounded">
                        <i className="bi bi-wallet2"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="fs-22 fw-semibold mb-1">
                        <CountUp end={dayDevis} separator="," /> DT
                      </h4>
                      <p className="mb-0 fw-medium text-uppercase fs-13">
                        Total Devis aujourd'hui
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow-sm border-0 overflow-hidden card-animate">
                <div className="position-absolute end-0 start-0 bottom-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // Xmlns:Xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1561")' fill="none">
                      <path
                        d="M306 65L446 -75"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M399 2L315 86"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M83 77L256 -96"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M281 212L460 33"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M257 62L76 243"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M305 123L214 214"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M327 222L440 109"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M287 109L362 34"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M259 194L332 121"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M376 186L240 322"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M308 153L123 338"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1553)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M218 62L285 -5"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1552)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1561">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1552"
                      >
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1553"
                      >
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-success-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-shrink-0 avatar-sm">
                      <div className="avatar-title bg-success-subtle text-success fs-2 rounded">
                        <i className="bi bi-wallet2"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="fs-22 fw-semibold mb-1">
                        <CountUp end={weekDevis} separator="," /> DT
                      </h4>
                      <p className="mb-0 fw-medium text-uppercase fs-13">
                        Total Devis du semaine
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow-sm border-0 overflow-hidden card-animate">
                <div className="position-absolute end-0 start-0 bottom-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // Xmlns:Xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1551")' fill="none">
                      <path
                        d="M306 65L446 -75"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1558)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M399 2L315 86"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M83 77L256 -96"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M281 212L460 33"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M257 62L76 243"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M305 123L214 214"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1558)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M327 222L440 109"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1558)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M287 109L362 34"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M259 194L332 121"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M376 186L240 322"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M308 153L123 338"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1559)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M218 62L285 -5"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1558)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1551">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1558"
                      >
                        <stop
                          stopColor="rgba(var(--tb-danger-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-danger-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1559"
                      >
                        <stop
                          stopColor="rgba(var(--tb-danger-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-danger-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-shrink-0 avatar-sm">
                      <div className="avatar-title bg-light-subtle text-dark fs-2 rounded">
                        <i className="bi bi-wallet2"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="fs-22 fw-semibold mb-1">
                        <CountUp end={monthDevis} separator="," /> DT
                      </h4>
                      <p className="mb-0 fw-medium text-uppercase fs-14">
                        Total Devis du mois
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow-sm border-0 overflow-hidden card-animate">
                <div className="position-absolute end-0 start-0 top-0 z-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    // Xmlns:Xlink="http://www.w3.org/1999/xlink"
                    width="400"
                    height="250"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 250"
                  >
                    <g mask='url("#SvgjsMask1530")' fill="none">
                      <path
                        d="M209 112L130 191"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M324 10L149 185"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M333 35L508 -140"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M282 58L131 209"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M290 16L410 -104"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M216 186L328 74"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M255 53L176 132"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M339 191L519 11"
                        strokeWidth="8"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M95 151L185 61"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M249 16L342 -77"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1532)"
                        strokeLinecap="round"
                        className="TopRight"
                      ></path>
                      <path
                        d="M129 230L286 73"
                        strokeWidth="10"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                      <path
                        d="M80 216L3 293"
                        strokeWidth="6"
                        stroke="url(#SvgjsLinearGradient1531)"
                        strokeLinecap="round"
                        className="BottomLeft"
                      ></path>
                    </g>
                    <defs>
                      <mask id="SvgjsMask1530">
                        <rect width="400" height="250" fill="#ffffff"></rect>
                      </mask>
                      <linearGradient
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        id="SvgjsLinearGradient1531"
                      >
                        <stop
                          stopColor="rgba(var(--tb-primary-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                      <linearGradient
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                        id="SvgjsLinearGradient1532"
                      >
                        <stop
                          stopColor="rgba(var(--tb-primary-rgb), 0)"
                          offset="0"
                        ></stop>
                        <stop
                          stopColor="rgba(var(--tb-primary-rgb), 0.1)"
                          offset="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <Card.Body className="p-4 z-1 position-relative">
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-shrink-0 avatar-sm">
                      <div className="avatar-title bg-primary-subtle text-primary fs-2 rounded">
                        <i className="bi bi-wallet2"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="fs-22 fw-semibold mb-1">
                        <CountUp
                          end={yearDevis}
                          start={0}
                          separator=","
                          suffix=" DT"
                        />
                      </h4>
                      <p className="mb-0 fw-medium text-uppercase fs-14">
                        Total Devis de l'année
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <InvoiceListTable />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DevisList;
