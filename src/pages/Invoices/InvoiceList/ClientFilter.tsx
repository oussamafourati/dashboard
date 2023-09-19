import React from "react";

interface ChildProps {
  type: string;
  setType: (data: string) => void;
}

const ClientFilter: React.FC<ChildProps> = ({ type, setType }) => {
  return (
    <React.Fragment>
      <div className="mb-3">
        <p className="text-muted text-uppercase fs-16 mb-3">Clients</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={type === "tous"}
            onChange={() => setType("tous")}
            id="flexCheck"
          />
          <label className="form-check-label fs-14" htmlFor="flexCheck">
            Tous
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={type === "passager"}
            onChange={() => setType("passager")}
            id="flexChecked"
          />
          <label className="form-check-label fs-14" htmlFor="flexChecked">
            Passager
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={type === "pro"}
            onChange={() => setType("pro")}
            id="CheckChecked"
          />
          <label className="form-check-label fs-14" htmlFor="CheckChecked">
            Pro
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientFilter;
