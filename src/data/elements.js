import pptxgen from "pptxgenjs";
import { fakeImages } from '../fakeImages';
import { addRowOfElements } from "../utilsTable";

const pptx = new pptxgen();


const elements = [
    {
        name: "Elemento 1",
        type: "image",
        element: {
            image: fakeImages.imagenBase64,
            options: {
            }
        }
    },
    {
        name: "Elemento 2",
        type: "text",
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
        type: "shape",
        element: {
            shape: pptx.shapes.OVAL,
            options: { fill: { color: pptx.colors.ACCENT1 } }
        }
    },
    {
        name: "Elemento 4",
        type: "shape",
        element: {
            shape: pptx.shapes.RECTANGLE,
            options: { fill: { color: pptx.colors.ACCENT1 } }
        }
    },
    {
        name: "Elemento 5",
        type: "custom",
        element: (slide, pageSize, x, y, w, h) => {
            //Se puede acceder a las propiedades del pageSize si es necesario
            const { pageWidth, pageHeight } = pageSize;
            //console.log('pageWidth', pageWidth);
            //console.log('pageHeight', pageHeight);
            slide.addShape(pptx.shapes.RECTANGLE, {
                x: x,
                y: y,
                w: w,
                h: h,
                fill: { color: pptx.colors.ACCENT2 }
            });
            slide.addText("Elemento Custom", {
                x: x,
                y: y,
                w: w,
                h: h,
                align: "center",
                color: "FFFFFF"
            });
        }
    },

];


export default elements;