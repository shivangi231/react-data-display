import React, { PureComponent } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Table from 'react-bootstrap/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './App.css';

class MainPage extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
     resultData : '',
     resultArray : ''
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
   axios("https://s3.amazonaws.com/open-to-cors/assignment.json").then((result)=>{
     let array = [];
     this.setState({
       resultData: result.data.products                     // result data fetched from the api
     }, () => {
       var products = this.state.resultData;
       var count = 0;
       for(var i in products){
         products[i].id = count ++;                       // added unique key to each object for table display
         array.push(products[i])                          // created array of objects to sort the data
       }

     })

     // sorted the array in descending order
     let value =  array.sort( function ( a, b ) { return b.popularity - a.popularity; } )
     this.setState({
       resultArray: value
     })

    }).catch(err => {

      console.log("Error Ocurred !!")
  })
 }
  render() {
    if(this.state.resultArray){
      return(

      <BootstrapTable data={ this.state.resultArray } options={ { noDataText: 'This is custom text for empty data' } }>
          <TableHeaderColumn hidden ={true} dataField='id' isKey={ true }>No</TableHeaderColumn>
          <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
          <TableHeaderColumn dataField='popularity'>Popularity</TableHeaderColumn>
      </BootstrapTable>
      )
    } else {

      return <div className="loader"></div>
    }


  }

}

export default MainPage;
