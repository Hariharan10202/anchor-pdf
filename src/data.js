export const dataPoints = ["Logo", "Header", "Paragraph", "Table"];
export const logo = ["src", "alt", "text"];

export const MapData = new Map();

const HeaderObj = [
  { width: "100px" },
  { height: "100px" },
  { border: "none" },
  { padding: "10px" },
  { backgroundColor: "transparent" },
  {
    font: {
      Size: "20px",
      Weight: "500",
      Style: "normal",
    },
  },
];

const LogoObj = [
  {
    src: "https://ship-development-data.s3.ap-south-1.amazonaws.com/domain-data/eae39fb0036d11ee89242f77ee3eef56.png",
  },
  { alt: "logo" },
  {
    StyleProps: {
      ObjectFit: "cover",
      Weight: "100px",
      Height: "50px",
    },
  },
];

const ParagraphObj = [
  { width: "100px" },
  { height: "100px" },
  { padding: "10px" },
  { border: "none" },
  { backgroundColor: "transparent" },
  {
    font: {
      Size: "20px",
      Weight: "500",
      Style: "normal",
    },
  },
];

MapData.set("Header", HeaderObj);
MapData.set("Logo", LogoObj);
MapData.set("Paragraph", ParagraphObj);

export const InputConfig = [];
