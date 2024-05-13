import pptxgen from "pptxgenjs";
import { fakeImages } from '../fakeImages';
import { addColumnOfElements, addRowOfElements } from "../utilsTable";
import elements from "./elements";

const pptx = new pptxgen();

const elementsSizedRow = [
    {
        name: "Elemento 1",
        type: "text",
        w: "10%",
        element: {
            text: "Elemento 1",
            options: {
                bold: true,
                fill: { color: "232323" },
                fontSize: 20,
                align: "center",
                color: "FFFFFF"
            }
        }
    },

    {
        name: "Elemento 2",
        type: "text",
        w: "40%",
        element: {
            text: "Elemento 2",
            options: {
                bold: true,
                fill: { color: "232323" },
                fontSize: 20,
                align: "center",
                color: "FFFFFF"
            }
        }
    },

    {
        name: "Elemento 3",
        type: "text",
        w: "10%",
        element: {
            text: "Elemento 3",
            options: {
                bold: true,
                fill: { color: "232323" },
                fontSize: 20,
                align: "center",
                color: "FFFFFF"
            }
        }
    },

    {
        name: "Elemento 4",
        type: "custom",
        w: "40%",
        element: (slide, pageSize, x, y, w, h) => {
            //Se puede acceder a las propiedades del pageSize si es necesario
            const { pageWidth, pageHeight } = pageSize;
            //console.log('pageWidth', pageWidth);
            //console.log('pageHeight', pageHeight);
            addColumnOfElements({
                slide,
                pageSize: {
                    width: pageWidth,
                    height: pageHeight
                },
                elements: elements,
                x,
                customwidth: w
            });
        }
    },
]

export default elementsSizedRow