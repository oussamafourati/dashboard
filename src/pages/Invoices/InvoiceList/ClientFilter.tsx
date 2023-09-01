import React from "react";

interface ChildProps {
  type: string;
  setType: (data: string) => void;
}

const ClientFilter: React.FC<ChildProps> = ({ type, setType }) => {
  return (
    <React.Fragment>
      <div className="mb-3">
        <p className="text-muted text-uppercase fs-14 mb-3">Clients</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={type === "tous"}
            onChange={() => setType("tous")}
          />
          <label className="form-check-label fs-18" htmlFor="flexCheckDefault">
            Tous
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={type === "passager"}
            onChange={() => setType("passager")}
          />
          <label className="form-check-label fs-18" htmlFor="flexCheckChecked">
            Passager
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={type === "pro"}
            onChange={() => setType("pro")}
          />
          <label className="form-check-label fs-18" htmlFor="flexCheckChecked">
            Pro
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientFilter;
