import {BarChart} from 'react-easy-chart';
import React from "react";
import Typography from '@material-ui/core/Typography';




class Month extends React.Component{
  constructor(props)
  {
    super(props)
    this.state = {
       graphData : [
        {
            "x": "COMPANY",
            "y": 0
        },
       
       
    ],

   }
  }
 
  componentDidMount()
  {

    fetch("http://localhost:5000/stats", {
      method: 'GET',

    }).then((response) => {
      return response.json();
    })
      .then((myJson) => {
         this.setState({ graphData: myJson })
      })
  }
  
    render()
    {
      
        return(
            <div >
            <Typography variant = "title">Monthly Stats </Typography>
              <BarChart
              axisLabels={{ x: 'My x Axis', y: 'My y Axis' }}
              height={400}
              width={600}
              axisLabels={{ x: 'Counts', y: 'Labels' }}

              axes
              data={this.state.graphData}

            />
         </div>
        );
    }
}
export default Month;
