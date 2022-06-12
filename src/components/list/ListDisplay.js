import React from 'react';
import { createContext, useReducer } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

//import { useEffect} from 'react';
import { useContext } from 'react';
import GlobalState from '../../global/GlobalState.js';

export default function ListDisplay(props) {
  /**
   * Input: array from JSON data
   * Output: This will render a list
   * Output: This will return a state for "selectionModel"
   **/

  const threat = props.jsonData;
  const columns = props.columnData;
  const checkboxSelectionSetter = props.multiSelect ? true : false;

  // const [selectionModel, setSelectionModel] = React.useState([]);

  //SelectedModel(selectionModel);

  const myContext = useContext(GlobalState);
  // myContext.selectedThreats = selectionModel
  // console.log(myContext.selectedThreats)

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        getRowId={(threat) => threat['ID']}
        rows={threat}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        components={{ Toolbar: GridToolbar }}
        //checkboxSelection = {checkboxSelectionSetter}

        checkboxSelection={checkboxSelectionSetter}
        onSelectionModelChange={(newSelectionModel) => {
          const addItemToState = newSelectionModel.map((location) =>
            threat.filter((row) => {
              return row['ID'] === location;
            })
          );
           //let convertedArray =  Object.fromEntries(addItemToState);
           console.log("Add Item to Stateray", addItemToState);
          
          // myContext.selectedThreats = addItemToState
          myContext.setselectedThreats(addItemToState);

          //console.log(myContext.selectedThreatsName, "selected Threats")
          //console.log(myContext);
          //console.log)
        }}
        //  selectionModel={selectionModel}

        // {...threat}
      />

      {/* <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectionModel, null, 4)}
      </pre> */}

      {/* 
      {selectionModel} */}
    </div>
  );
}

// function SelectedModel(props) {
//   const selectedData = props.selectedData;
//   console.log(selectedData);
//   return selectedData;
// }
