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
          <p className="text-muted text-uppercase fs-16 mb-3">Status</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={status === 2}
              onChange={() => setStatus(2)}
              id="flexChec"
            />
            <label className="form-check-label fs-14" htmlFor="flexChec">
              Payé
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={status === 0}
              onChange={() => setStatus(0)}
              id="heckChecked"
            />
            <label className="form-check-label fs-14" htmlFor="heckChecked">
              Impayé
            </label>
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default StatusFilter;
