import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Header } from "../components/Header";
import openDoc from "../public/openDoc.json";

const ApiDoc = () => {
  return (
    <>
      <Header />
      <SwaggerUI spec={openDoc} />
    </>
  );
};

export default ApiDoc;
