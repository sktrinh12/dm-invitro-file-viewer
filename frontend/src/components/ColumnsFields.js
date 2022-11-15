const PurpleColour = "#343990ff";

ColumnFields = () => {
  return [
    {
      id: "EXPERIMENT_ID",
      label: "Compound ID",
      minWidth: 90,
      fontWeight: "bold",
      backgroundColor: PurpleColour,
      color: "#efeff6ff",
    },
    {
      id: "CRO",
      label: "CRO",
      minWidth: 90,
      fontWeight: "bold",
      backgroundColor: PurpleColour,
      color: "#efeff6ff",
    },
    {
      id: "ASSAY_TYPE",
      label: "Assay Type",
      minWidth: 50,
      align: "right",
      fontWeight: "bold",
      backgroundColor: PurpleColour,
      color: "#efeff6ff",
    },
    {
      id: "FILE_NAME",
      label: "File Name",
      minWidth: 50,
      fontWeight: "bold",
      backgroundColor: PurpleColour,
      color: "#efeff6ff",
    },
    {
      id: "DOC",
      label: "Docs",
      minWidth: 50,
      fontWeight: "bold",
      backgroundColor: PurpleColour,
      color: "#efeff6ff",
    },
  ];
};

export default ColumnFields;
