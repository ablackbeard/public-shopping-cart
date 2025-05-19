import { useState, useEffect } from "react";
import InventoryTable from "../components/InventoryTable";

export default function Inventory() {
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [openID, setOpenID] = useState(-1);

  useEffect(() => {
    setRows([
      { id: 1, itemName: "Apple", stock: 1 },
      { id: 2, itemName: "Banana", stock: 1 },
      { id: 3, itemName: "Cherry", stock: 1 },
      { id: 4, itemName: "Donut", stock: 1 },
      { id: 5, itemName: "Egg", stock: 1 },
      { id: 6, itemName: "Fries", stock: 1 },
      { id: 7, itemName: "Grapes", stock: 1 },
      { id: 8, itemName: "Hamburger", stock: 1 },
    ]);
  }, []);

  // TODO:
  // - Implement a fuzzy-finder search bar above the table.
  // - Implement a "Per-Item card" on the side of the table.
  //   This should use the openID state to display a set of options for mutating data
  // - Implement a "New-Item card" below the table.
  //   This should present a form suitable for insertion of a new item-type.
  // - useEffect for reading openID and opening a new per-item
  // - Button for opening New-Item card.
  // - Buttons with drilled CBs to add to and change rows.
  // - Figure out how to get rid of the weird boxes on selection of cells. We don't care about those.
  return (
    <>
      {/*<div className="inv-container">
                <InventoryTable cb={(a) => setSelected(a)} rows={rows} rowClickCB={(e) => setOpenID(e.id)} />
            </div>*/}
    </>
  );
}
