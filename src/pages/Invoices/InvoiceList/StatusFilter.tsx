import React, { useState } from "react";
import { Row } from "react-bootstrap";

interface StatusProps {
  status: number;
  setStatus: (data: number) => void;
}

const StatusFilter: React.FC<StatusProps> = ({ status, setStatus }) => {
  return (
    <React.Fragment>
      <Row>
        <div className="mb-3">
          <p className="text-muted text-uppercase fs-14 mb-3">Status</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={status === 2}
              onChange={() => setStatus(2)}
            />
            <label
              className="form-check-label fs-18"
              htmlFor="flexCheckDefault"
            >
              Payé
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={status === 1}
              onChange={() => setStatus(1)}
            />
            <label
              className="form-check-label fs-18"
              htmlFor="flexCheckChecked"
            >
              Semi-Payé
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={status === 0}
              onChange={() => setStatus(0)}
            />
            <label
              className="form-check-label fs-18"
              htmlFor="flexCheckChecked"
            >
              Impayé
            </label>
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default StatusFilter;
