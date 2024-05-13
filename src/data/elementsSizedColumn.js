import pptxgen from "pptxgenjs";
import { fakeImages } from '../fakeImages';
import { addRowOfElements } from "../utilsTable";
import elements from "./elements";


const pptx = new pptxgen();

const elementsSizedColumn = [
    {
        name: "Elemento 1",
        type: "text",
        h: "10%",
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
        h: "40%",
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
        h: "10%",
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
        h: "40%",
        element: (slide, pageSize, x, y, w, h) => {
            const { pageWidth, pageHeight } = pageSize;
            //console.log('pageWidth', pageWidth);
            //console.log('pageHeight', pageHeight);
            addRowOfElements({
                slide,
                pageSize: {
                    width: pageWidth,
                    height: pageHeight
                },
                elements: elements,
                y,
                customheight: h,
                gap: 0
            });
        }
    },
]

export default elementsSizedColumn