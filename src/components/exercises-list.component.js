import React, { Component } from "react"; 
import {Link} from 'react-router-dom';
import axios from "axios";

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <button className="btn btn-link"><Link to={"/edit/"+props.exercise._id} >edit</Link></button> 
            <button href="#" onClick={ ()=> {props.deleteExercise(props.exercise._id) }} className="btn btn-outline-danger">delete</button>
        </td>

    </tr>
)

export default class ExercisesList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        
        this.state = {exercises :[]}
    }

    componentDidMount(){
        axios
          .get("http://localhost:5000/exercises")
          .then(res => {
              this.setState({ exercises: res.data})
          })
          .catch(err => console.error(err));
    }

    deleteExercise(id){
        console.log('called delete')
        axios
          .delete("http://localhost:5000/exercises/"+id)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
          this.setState({
              exercises: this.state.exercises.filter(el => el._id !== id)
          })
    }

    exercisesList(){
        return this.state.exercises.map(currentExercise => {
            return <Exercise 
                        exercise={currentExercise} 
                        deleteExercise={this.deleteExercise}
                        key={currentExercise._id} />
        })
    }

  render() {
    return (
     <div>
        <h3>Logged Exercises</h3>
        <table className="table">
            <thead className="thead-light"> 
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Options</th>

                </tr>
            </thead>
            <tbody>
                {this.exercisesList()}
            </tbody>
        </table>
     </div>
    );
  }
}
