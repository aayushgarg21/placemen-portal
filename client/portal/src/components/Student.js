import React from "react";
import Job from "./Job";
class Students extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {Jobs : []}
    }
    componentDidMount()
    {
        fetch("http://localhost:5000/search", {
      method: 'GET',

    }).then((response) => {
      return response.json();
    })
      .then((myJson) => {
         this.setState({ Jobs: myJson })
      })

    }
    render()
    {
        return(
            <div>
                {
                this.state.Jobs.map((element) =>
                {
                    return(<Job
                    company = {element.company}
                    title = {element.title}
                    description = {element.description}
                    salary = {element.salary}

                    
                    />)
                }
                )
                }
            </div>
          
        );
    }
}
export default Students;