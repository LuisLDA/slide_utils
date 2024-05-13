import pptxgen from "pptxgenjs";
import { addColumnOfElements, addColumnOfElementsWithSizes, addRowOfElements, addRowOfElementsWithSizes } from './utilsTable';
import elements from './data/elements';
import elementsSizedRow from "./data/elementsSizedRow";
import elementsSizedColumn from "./data/elementsSizedColumn";




function App() {


  let pptx = new pptxgen();
  pptx.defineLayout = { name: "A4", width: 10, height: 8 }

  let slide1 = pptx.addSlide();

  slide1.addText("Cantidad de Elementos: 1", {
    x: 0,
    y: 0,
    w: "100%",
    h: "10%",
    fontSize: 18,
    color: "0088CC",
    bold: true,
    align: "left"
  });


  addRowOfElements({
    slide: slide1,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 1),
    y: "10%",
    customheight: "15%",
    gap: 0
  });


  slide1.addText("Cantidad de Elementos: 2 , GAP: 0", {
    x: 0,
    y: "25%",
    w: "100%",
    h: "10%",
    fontSize: 18,
    color: "0088CC",
    bold: true,
    align: "left"
  });


  addRowOfElements({
    slide: slide1,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 2),
    y: "35%",
    customheight: "15%",
    gap: 0
  });

  slide1.addText("Cantidad de Elementos: 3 , GAP: 0.5", {
    x: 0,
    y: "50%",
    w: "100%",
    h: "10%",
    fontSize: 18,
    color: "0088CC",
    bold: true,
    align: "left"
  });

  addRowOfElements({
    slide: slide1,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 3),
    y: "60%",
    customheight: "15%",
    gap: 0.5
  });

  slide1.addText("Cantidad de Elementos: 4 , GAP: 1", {
    x: 0,
    y: "75%",
    w: "100%",
    h: "10%",
    fontSize: 18,
    color: "0088CC",
    bold: true,
    align: "left"
  });

  addRowOfElements({
    slide: slide1,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 4),
    y: "85%",
    customheight: "15%",
    gap: 1
  });



  //add a new slide
  let slide2 = pptx.addSlide();
  addRowOfElements({
    slide: slide2,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 5),
    y: 0,
    customheight: 1,
    gap: 0
  });


  //add a new slide

  let slide3 = pptx.addSlide();

  addColumnOfElements({
    slide: slide3,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 5),
    x: 0,
    customwidth: pptx.defineLayout.width * 0.15,
    gapPercent: "10%"
  });


  addColumnOfElements({
    slide: slide3,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 4),
    x: "20%",
    customwidth: pptx.defineLayout.width * 0.15,
    gapPercent: "10%"
  });


  addColumnOfElements({
    slide: slide3,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 3),
    x: "40%",
    customwidth: pptx.defineLayout.width * 0.15,
    gapPercent: "10%"
  });


  addColumnOfElements({
    slide: slide3,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 2),
    x: "60%",
    customwidth: pptx.defineLayout.width * 0.15,
    gapPercent: "10%"
  });



  addColumnOfElements({
    slide: slide3,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elements.slice(0, 1),
    x: "80%",
    customwidth: pptx.defineLayout.width * 0.15,
    gapPercent: "10%"
  });


  let slide5 = pptx.addSlide();

  addRowOfElementsWithSizes({
    slide: slide5,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elementsSizedRow,
    y: 0,
    customheight: "25%",
    gap: 0
  });


  let slide6 = pptx.addSlide();

  addColumnOfElementsWithSizes({
    slide: slide6,
    pageSize: {
      width: pptx.defineLayout.width,
      height: pptx.defineLayout.height
    },
    elements: elementsSizedColumn,
    x: 0,
    customwidth: "25%",
    gapPercent: "10%"
  });



  return (
    <div className="App">

      <button 
      onClick={() => {
        pptx.writeFile();
      }} 
      type="button">Export to PPTX</button>

    </div>

  );
}

export default App;
