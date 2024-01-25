const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  //console.log("columnsArray:", columnsArray);
  //console.log("dataArray:", dataArray);
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento da tabela selecionada"
    );
  }
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Id informado não corresponde a nenhum elemento table");
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createtHeadElement(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderReference =
    tableReference.querySelector("thead") ?? createtHeadElement(tableReference);
  const headerRow = document.createElement("tr");
  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class='text-center'>${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItens, columnsArray) {
  function createtBodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createtBodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItens.entries()) {
    const tableRow = document.createElement("tr");
    if (itemIndex % 2 !== 0) {
      tableRow.classList.add("bg-blue-200");
    }
    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);
      // console.log(
      //   `tableItem[tableColumn.accessor]; ${tableItem[tableColumn.accessor]}`
      // );
      //tableRow.innerHTML += /*html*/ `<td class='text-center'>${
      //  tableItem[tableColumn.accessor]
      tableRow.innerHTML += /*html*/ `<td class='text-center'>${
        tableColumn.format
          ? tableColumn.format(tableItem[tableColumn.accessor])
          : tableItem[tableColumn.accessor]
      }</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
}
