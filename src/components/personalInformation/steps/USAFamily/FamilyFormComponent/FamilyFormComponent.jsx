import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import relativeRelationship from "../../../../../datas/relative_relationship";
import relativeUSStatus from "../../../../../datas/relative_us_status";

const FamilyFormComponent = ({
  data,
  index,
  length,
  handleNameChange,
  handleRelationshipChange,
  handleStatusChange,
  handleAddFamilyMember,
}) => {
  return (
    <div className="div-usa-padding">
      <div>
        <div className="div-grid-usa-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Nome do familiar nos Estados Unidos
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div>
              <TextField
                id="outlined-basic"
                className="input-style-usa"
                placeholder="Escreva o primeiro nome"
                variant="outlined"
                name="given_name"
                value={data.name.given_name}
                onChange={(e) => handleNameChange(e, index)}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Sobrenome do familiar nos Estados Unidos
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div>
              <TextField
                id="outlined-basic"
                className="input-style-usa"
                placeholder="Escreva o sobrenome"
                variant="outlined"
                name="surname"
                value={data.name.surname}
                onChange={(e) => handleNameChange(e, index)}
              />
            </div>
          </div>
        </div>
        <div className="div-grid-usa-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Qual a sua relação com o familiar nos Estados Unidos?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div>
              <Select
                className="style-select-initial input-style-initial"
                placeholder="teste"
                value={data.relationship}
                onChange={(e) => handleRelationshipChange(e, index)}
              >
                {relativeRelationship.map((status) => (
                  <MenuItem key={status.key} value={status.key}>
                    {status.value}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">
                Qual a situação do seu familiar nos Estados Unidos?
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div>
              <Select
                className="style-select-initial input-style-initial"
                placeholder="teste"
                value={data.us_status}
                onChange={(e) => handleStatusChange(e, index)}
              >
                {relativeUSStatus.map((status) => (
                  <MenuItem key={status.key} value={status.key}>
                    {status.value}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        {index < 1 && (
          <div>
            <div className="padding-usa">
              <span className="title-header-2">
                Possui algum outro nos Estados
                Unidos?(Esposo(a);noivo(a);filho(a);irmão(a);)
                <span style={{ color: "red" }}>*</span>
              </span>
            </div>
            <div className="padding-usa">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={length === 0 ? "Não" : "Sim"}
                name="radio-buttons-group"
                className="subTitle-div-2"
                row
                onChange={handleAddFamilyMember}
              >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
              </RadioGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyFormComponent;
