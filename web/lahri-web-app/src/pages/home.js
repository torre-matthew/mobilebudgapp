import { Container } from "@mui/material";
import { bgcolor } from "@mui/system";
import React from "react";
import DatePicker from '../components/datePicker';
import MainBodyContainer from "../components/mainBodyContainer";
import API from '../utilities/apiMethods';



// 5e952c83a5ad7500176ad379
class Home extends React.Component {
    state = {
        monthData: [],
      };
    
      componentDidMount(){
        this.getMonthData();
      }
    
      getMonthData = () => {
        API.getMonthData()
          .then(arrayOfMonths => {
              this.setState({monthData: arrayOfMonths.data})
            }
          )
          .catch(err => console.log(err));
      }

      getAllUnplannedExpenses = () => {
        API.getAllUnPlannedExpenses("5e952c83a5ad7500176ad379").then().catch(err => console.log(err));
      }

    render() {
      return (
        <Container>
            <DatePicker monthData={this.state.monthData} />
            <MainBodyContainer />
        </Container>
        );
    }
  }

export default Home;