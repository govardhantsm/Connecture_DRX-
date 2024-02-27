import React from "react";
import { useRoutes } from "react-router-dom";
import SForm from "../Components/SFrom";
import Table from "../Components/Table";
// import SprintForm from "../components/SprintForm";
// import TableData from "../components/TableData";

const CustomRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <SForm />,
    },
    {
      path: "/table-data",
      element: <Table />,
    },
  ]);
  return routes;
};

export default CustomRoutes;
