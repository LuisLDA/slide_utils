
/**
 * Agrega una fila de elementos a una diapositiva y reparte el ancho de la fila entre los elementos.
 * Esta puede recibir imágenes, texto, formas o elementos personalizados.
 * @param {Object} options - The options for adding the row of elements.
 * @param {Object} options.slide - The slide to add the elements to.
 * @param {Object} options.pageSize - The size of the page.
 * @param {number} options.pageSize.width - The width of the page.
 * @param {number} options.pageSize.height - The height of the page.
 * @param {Array} options.elements - The elements to add to the row (images, text, shapes, or custom elements). 
 * @param {number} [options.y=0] - The y-coordinate of the row.
 * @param {number} [options.customheight=0] - The custom height of the elements.
 * @param {number} [options.gap=0] - The gap between elements.
 * @returns {Object} - An object containing the updated slide, column width, and positions of the elements.
 * @throws {Error} - If the width or height of the page is undefined.
 */
export const addRowOfElements = ({ slide, pageSize: { width, height }, elements, y = 0, customheight = 0, gap = 0 }) => {

  if(width === undefined || height === undefined){
    throw new Error("The width and height of the page must be defined");
  }

  const colums = elements.length;
  let columWidth = (width - gap * (colums + 1)) / colums; 

  let positions = [];

  for (let j = 0; j < colums; j++) {
    let xPosition = (columWidth + gap) * j + gap; 

    if (elements[j].type === "image") {
      slide.addImage(Object.assign({}, elements[j].element.options, {
        data: elements[j].element.image,
        x: xPosition,
        y: y,
        w: columWidth,
        h: customheight || columWidth,
      }));
    }

    if (elements[j].type === "text") {
      slide.addText(elements[j].element.text, Object.assign({}, elements[j].element.options, {
        x: xPosition,
        y: y,
        w: columWidth,
        h: customheight || columWidth,
      }));
    }

    if (elements[j].type === "shape") {
      slide.addShape(elements[j].element.shape, Object.assign({}, elements[j].element.options, {
        x: xPosition,
        y: y,
        w: columWidth,
        h: customheight || columWidth,
      }));
    }

    if (elements[j].type === "custom") {
      elements[j].element(slide, {
        pageWidth: width,
        pageHeight: height
      }, xPosition, y, columWidth, customheight || columWidth);
    }

    positions.push({
      x: xPosition,
      y: y,
      w: columWidth,
      h: customheight || columWidth,
    });
  }

  return {
    slide,
    columWidth,
    positions
  }
}



/**
 * Agrega una columna de elementos a una diapositiva y reparte el alto de la columna entre los elementos.
 * Esta puede recibir imágenes, texto, formas o elementos personalizados.
 * @param {Object} options - The options for adding the column of elements.
 * @param {Object} options.slide - The slide to add the elements to.
 * @param {Object} options.pageSize - The size of the page.
 * @param {number} options.pageSize.width - The width of the page.
 * @param {number} options.pageSize.height - The height of the page.
 * @param {Array} options.elements - The elements to add to the column (images, text, shapes, or custom elements).
 * @param {number} [options.x=0] - The x position of the elements.
 * @param {number} [options.customwidth=0] - The custom width of the elements.
 * @param {string} [options.gapPercent="0%"] - The percentage gap between elements.
 * @returns {Object} - An object containing the updated slide, row height, and positions of the elements.
 * @throws {Error} - If the width or height of the page is undefined.
 */
export const addColumnOfElements = ({ slide, pageSize: { width, height }, elements, x = 0, customwidth = 0, gapPercent = "0%" }) => {

  
  if(width === undefined || height === undefined){
    throw new Error("The width and height of the page must be defined");
  }


  const rows = elements.length;
  const gap = height * (parseFloat(gapPercent) / 100);
  const totalGap = gap * (rows - 1);
  const rowHeight = (100 - totalGap) / rows;
  const rowHeightPercent = `${rowHeight}%`;
  let positions = [];

  for (let j = 0; j < rows; j++) {
    const yPosition = (rowHeight * j) + gap * j;
    const yInPercent = `${yPosition}%`;
    const elementOptions = {
      x,
      y: yInPercent,
      w: customwidth || rowHeightPercent,
      h: rowHeightPercent,
    };

    if (elements[j].type === "image") {
      slide.addImage(Object.assign({}, elements[j].element.options, {
        data: elements[j].element.image,
        ...elementOptions,
      }));
    }

    if (elements[j].type === "text") {
      slide.addText(elements[j].element.text, Object.assign({}, elements[j].element.options, {
        ...elementOptions,
      }));
    }

    if (elements[j].type === "shape") {
      slide.addShape(elements[j].element.shape, Object.assign({}, elements[j].element.options, {
        ...elementOptions,
      }));
    }

    if (elements[j].type === "custom") {
      elements[j].element(slide, {
        pageWidth: width,
        pageHeight: height
      }, x, yInPercent, customwidth || rowHeightPercent, rowHeightPercent);
    }

    positions.push({
      x,
      y: yPosition,
      w: customwidth || rowHeightPercent,
      h: rowHeightPercent,
    });
  }

  return {
    slide,
    rowHeight,
    positions
  };
}


/**
 * Agrega una fila de elementos a una diapositiva que tienen tamaños personalizados.
 * Esta puede recibir imágenes, texto, formas o elementos personalizados.
 * @param {Object} options - The options for adding the row of elements.
 * @param {Object} options.slide - The slide to add the elements to.
 * @param {Object} options.pageSize - The size of the page.
 * @param {number} options.pageSize.width - The width of the page.
 * @param {number} options.pageSize.height - The height of the page.
 * @param {Array} options.elements - The elements to add to the row (images, text, shapes, or custom elements).
 * @param {number} [options.y=0] - The y-position of the elements.
 * @param {number} [options.customheight=0] - The custom height of the elements.
 * @returns {Object} - An object containing the slide and positions of the added elements.
 * @throws {Error} - If the width or height of the page is undefined.
 * @throws {Error} - If the width of an element is not in percentage.
 * @throws {Error} - If the height of an element is not in percentage.
 * @throws {Error} - If the width of an element is greater than 100.
 * @throws {Error} - If the sum of the widths of the elements is not equal to 100.
 */
export const addRowOfElementsWithSizes = ({ slide, pageSize: { width, height }, elements, y = 0, customheight = 0 }) => {

  
  if(width === undefined || height === undefined){
    throw new Error("The width and height of the page must be defined");
  }

  let totalWidth = elements.reduce((acc, element) => {

    if (!element.w.includes("%")) {
      throw new Error("The width of the element must be in percentage");
    }

    if (element.h && !element.h.includes("%")) {
      throw new Error("The height of the element must be in percentage");
    }

    const width = parseFloat(element.w);
    if (width > 100) {
      throw new Error("The width of the element cannot be greater than 100");
    }
    return acc + width;
  }, 0);

  if (totalWidth !== 100) {
    throw new Error("The sum of the widths of the elements must be equal to 100");
  }


  let positions = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementWidth = parseFloat(element.w);
    const xPosition = i === 0 ? 0 : positions[i - 1].x + positions[i - 1].w;

    if (element.type === "image") {
      slide.addImage(Object.assign({}, element.element.options, {
        data: element.element.image,
        x: `${xPosition}%`,
        y: y,
        w: `${elementWidth}%`,
        h: customheight || `${elementWidth}%`,
      }));
    }

    if (element.type === "text") {
      slide.addText(element.element.text, Object.assign({}, element.element.options, {
        x: `${xPosition}%`,
        y: y,
        w: `${elementWidth}%`,
        h: customheight || `${elementWidth}%`,
      }));
    }

    if (element.type === "shape") {
      slide.addShape(element.element.shape, Object.assign({}, element.element.options, {
        x: `${xPosition}%`,
        y: y,
        w: `${elementWidth}%`,
        h: customheight || `${elementWidth}%`,
      }));
    }

    if (element.type === "custom") {
      element.element(slide, {
        pageWidth: width,
        pageHeight: height
      }, `${xPosition}%`, y, `${elementWidth}%`, customheight || `${elementWidth}%`);
    }

    positions.push({
      x: xPosition,
      y,
      w: elementWidth,
      h: customheight || elementWidth,
    });
  }

  return {
    slide,
    positions
  }

}


/**
 * Agraga una columna de elementos a una diapositiva que tienen tamaños personalizados.
 * Esta puede recibir imágenes, texto, formas o elementos personalizados.
 * @param {Object} options - The options for adding the column of elements.
 * @param {Object} options.slide - The slide to add the elements to.
 * @param {Object} options.pageSize - The size of the page.
 * @param {number} options.pageSize.width - The width of the page.
 * @param {number} options.pageSize.height - The height of the page.
 * @param {Array} options.elements - The elements to add to the column (images, text, shapes, or custom elements).
 * @param {number} [options.x=0] - The x position of the elements.
 * @param {number} [options.customwidth=0] - The custom width of the elements.
 * @returns {Object} - An object containing the slide and positions of the added elements.
 * @throws {Error} - If the width and height of the page are not defined.
 * @throws {Error} - If the height of the element is not in percentage.
 * @throws {Error} - If the width of the element is not in percentage.
 * @throws {Error} - If the height of the element is greater than 100.
 * @throws {Error} - If the sum of the heights of the elements is not equal to 100.
 */
export const addColumnOfElementsWithSizes = ({ slide, pageSize: { width, height }, elements, x = 0, customwidth = 0 }) => {

  
  if(width === undefined || height === undefined){
    throw new Error("The width and height of the page must be defined");
  }

  let totalHeight = elements.reduce((acc, element) => {

    if (!element.h.includes("%")) {
      throw new Error("The height of the element must be in percentage");
    }

    if (element.w && !element.w.includes("%")) {
      throw new Error("The width of the element must be in percentage");
    }

    const height = parseFloat(element.h);
    if (height > 100) {
      throw new Error("The height of the element cannot be greater than 100");
    }
    return acc + height;
  }, 0);

  if (totalHeight !== 100) {
    throw new Error("The sum of the heights of the elements must be equal to 100");
  }

  let positions = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementHeight = parseFloat(element.h);
    const yPosition = i === 0 ? 0 : positions[i - 1].y + positions[i - 1].h;

    if (element.type === "image") {
      slide.addImage(Object.assign({}, element.element.options, {
        data: element.element.image,
        x,
        y: `${yPosition}%`,
        w: customwidth || `${elementHeight}%`,
        h: `${elementHeight}%`,
      }));
    }

    if (element.type === "text") {
      slide.addText(element.element.text, Object.assign({}, element.element.options, {
        x,
        y: `${yPosition}%`,
        w: customwidth || `${elementHeight}%`,
        h: `${elementHeight}%`,
      }));
    }

    if (element.type === "shape") {
      slide.addShape(element.element.shape, Object.assign({}, element.element.options, {
        x,
        y: `${yPosition}%`,
        w: customwidth || `${elementHeight}%`,
        h: `${elementHeight}%`,
      }));
    }

    if (element.type === "custom") {
      element.element(slide, {
        pageWidth: width,
        pageHeight: height
      }, x, `${yPosition}%`, customwidth || `${elementHeight}%`, `${elementHeight}%`);
    }

    positions.push({
      x,
      y: yPosition,
      w: customwidth || elementHeight,
      h: elementHeight,
    });
  }

  return {
    slide,
    positions
  }
}

