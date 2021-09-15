import { Container } from "@material-ui/core";
import React from "react";
import DatePicker from '../components/datePicker';
import API from '../utilities/apiMethods'

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
              console.log(this.state.monthData);
            }
          )
          .catch(err => console.log(err));
      }

    render() {
      return (
        <Container>
            <DatePicker monthData={this.state.monthData} />
            <h1>Come on Home, phuckas!!!</h1>
        </Container>
        );
    }
  }

export default Home;