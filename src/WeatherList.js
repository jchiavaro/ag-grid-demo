import React, { Component } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import './WeatherList.css';

const APPID = "a3c7f0ae8a5cf4854f92b9d9ea275271"

class WeatherList extends Component {
    constructor(props) {
        super(props);
        this.onSelectionChanged.bind(this);
        this.state = {
            columns: [
                {headerName: "City", field: "name"},
                {headerName: "Longitude", field: "coord.lon"},
                {headerName: "Latitude", field: "coord.lat"}
            ],
            rowSelection: "single",
            weatherColumns: [
                {headerName: "Weather", field: "main"},
                {headerName: "Description", field: "description"}
            ],
        }
    }

    componentDidMount() {
      axios.get('/group',{
        params: {
          id: "524901,703448,2643743,3435910,5128581",
          units: "metric",
          APPID: APPID
        }})
        .then(res => {
          const result = res.data;
          this.setState({ rowData: result.list });
        })
    }

    onSelectionChanged = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      console.log(selectedNodes)
      const selectedData = selectedNodes.map( node => node.data )
      const selectedId = selectedData.map( node => node.id)
      axios.get("/weather", {
        params: {
          id: selectedId.join(""),
          APPID: APPID
        }
      })
        .then(res => {
          const result = res.data;
          console.log(result.weather);
          this.setState({ weatherRows: result.weather });
        })
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

    render() {
        return (
                <div className="ag-theme-balham WeatherList">
                    <AgGridReact
                        rowSelection={this.state.rowSelection}
                        onGridReady={this.onGridReady.bind(this)}
                        rowMultiSelectWithClick={true}
                        enableFilter={true}
                        enableSorting={true}
                        columnDefs={this.state.columns}
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        rowData={this.state.rowData}>
                    </AgGridReact>

                    <AgGridReact
                        columnDefs={this.state.weatherColumns}
                        rowData={this.state.weatherRows}>
                    </AgGridReact>
                </div>
            );
    }
}

export default WeatherList;
