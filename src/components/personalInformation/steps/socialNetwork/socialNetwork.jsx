import React, { useEffect } from "react";
import "./socialNetwork.css";
import { TextField } from "@mui/material";
import { useData } from "../../../../dataContext/dataContext";

function SocialNetwork({ validateStep }) {
  const { data, updateData } = useData();

  const handleChange = (event) => {
    const { value, name } = event.target;
    let newData;

    if (data.social_medias === null) {
      newData = {
        ...data,
        social_medias: [{ platform: name, identifier: value }],
      };
    } else {
      const updatedSocialMedias = [...data.social_medias];
      const mediaIndex = updatedSocialMedias.findIndex(
        (media) => media.platform === name
      );

      if (value === "") {
        if (mediaIndex !== -1) {
          updatedSocialMedias.splice(mediaIndex, 1);
        }
      } else {
        if (mediaIndex !== -1) {
          updatedSocialMedias[mediaIndex] = {
            ...updatedSocialMedias[mediaIndex],
            identifier: value,
          };
        } else {
          updatedSocialMedias.push({ platform: name, identifier: value });
        }
      }

      newData = {
        ...data,
        social_medias: updatedSocialMedias,
      };
    }

    updateData(newData);
  };

  useEffect(() => {
    validateStep();
  }, [data]);

  return (
    <div className="div-margin">
      <div className="padding-bottom">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <span className="title-header">Redes sociais</span>
          </div>
        </div>
        <hr className="hr-color" />
      </div>
      <div className="div-social-padding">
        <div className="div-grid-social-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">Instagram</span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-social"
                placeholder="@Exemplo"
                variant="outlined"
                name="INST"
                value={
                  data.social_medias !== null
                    ? data.social_medias.find(
                        (media) => media.platform === "INST"
                      )?.identifier || ""
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">Twitter</span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-social-net"
                placeholder="@Exemplo"
                variant="outlined"
                name="TWIT"
                value={
                  data.social_medias !== null
                    ? data.social_medias.find(
                        (media) => media.platform === "TWIT"
                      )?.identifier || ""
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="div-grid-social-inputs">
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">Linkedin</span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-social-netlink"
                placeholder="Seu nome no linkedin"
                variant="outlined"
                name="LINK"
                value={
                  data.social_medias !== null
                    ? data.social_medias.find(
                        (media) => media.platform === "LINK"
                      )?.identifier || ""
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingBottom: "0.4rem" }}>
              <span className="span-state">Facebook</span>
            </div>
            <div className="padding-bottom-1">
              <TextField
                id="outlined-basic"
                className="input-style-social"
                placeholder="Seu nome no facebook"
                variant="outlined"
                name="FCBK"
                value={
                  data.social_medias !== null
                    ? data.social_medias.find(
                        (media) => media.platform === "FCBK"
                      )?.identifier || ""
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialNetwork;
