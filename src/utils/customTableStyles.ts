import { TableStyles } from "react-data-table-component";
import { useColorMode } from "@chakra-ui/react";

export const useCustomStyles = () => {
  const { colorMode } = useColorMode();

  return colorMode === "light" ? customStylesLight : customStylesDark;
};

export const customStylesLight: TableStyles = {
  table: {
    style: {
      height: "fit-content",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(14px)",
    },
  },
  headRow: {
    style: {
      display: "flex",
      gap: "0.5rem",
      backgroundColor: "#C9CED6",
      color: "#0D1117",
      fontSize: "15px",
      fontWeight: 700,
      paddingLeft: "1rem",
      paddingRight: "1rem",
      borderRadius: "10px 10px 0px 0px",
    },
  },
  headCells: {
    style: {
      letterSpacing: "0.2px",
    },
  },
  rows: {
    style: {
      display: "flex",
      gap: "0.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      backgroundColor: "#C9CED6",
      color: "#11161d",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
  cells: {
    style: {
      letterSpacing: "0.2px",
      minWidth: "unset",
    },
  },
};

export const customStylesDark: TableStyles = {
  table: {
    style: {
      height: "fit-content",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(14px)",
    },
  },
  headRow: {
    style: {
      display: "flex",
      gap: "0.5rem",
      backgroundColor: "#0D1117",
      color: "#C9CED6",
      fontSize: "15px",
      fontWeight: 700,
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  headCells: {
    style: {
      letterSpacing: "0.2px",
    },
  },
  rows: {
    style: {
      display: "flex",
      gap: "0.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      backgroundColor: "#11161d",
      color: "#C9CED6",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
  cells: {
    style: {
      letterSpacing: "0.2px",
      minWidth: "unset",
    },
  },
};
