import React from "react";
import { RedocStandalone } from "redoc";
import doc from "./openDoc";
export const Doc = () => {
  return <RedocStandalone spec={doc} />;
};
