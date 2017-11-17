import * as React from "react";
import {connect} from "react-redux";
import FormRow from "./FormRow";
import actions from "../../actions";


function ParseLabelOutput(props){
  var keyValue=props.keyValue.replace("${containerid}", props.containerId);
  keyValue=keyValue.replace("${imagename}", props.imageName);
  keyValue=keyValue.replace("${stackname}", props.serviceName.slice(0,(props.serviceName.indexOf(props.imageName)-(props.serviceName.length + 1))));
  
  if(props.keyLabel.indexOf("swarm-viz.link.")===0){
    return(
      <FormRow label={props.keyLabel.slice(-((props.keyLabel.length-1)-(props.keyLabel.lastIndexOf("."))))}>
        <a href={keyValue}> {keyValue} </a>
      </FormRow>
    )
  }
  //Slicing off the "swarm-viz." to look neater
  var keyLabel=props.keyLabel.slice(10);
  return(
    <FormRow label={keyLabel}>
      {keyValue}
    </FormRow>
  )
}

class SwarmVizLabelParser extends React.Component {
  render(){
    const { task, service } = this.props;
    var toBeParsed = Object.keys(service.Spec.Labels).filter(function(label){
      return label.indexOf("swarm-viz.")===0;
    })
    return(
      <div>
        { toBeParsed.length>= 1 && (
          <span>
            <hr />
            <h3>Extra Info</h3>
              { toBeParsed.map((key) => (
                <div key={key}><ParseLabelOutput keyLabel={key} keyValue={ service.Spec.Labels[key] } 
                    containerId={task.Status.ContainerStatus.ContainerID}
                    imageName={task.Spec.ContainerSpec.Image.slice(0,-(task.Spec.ContainerSpec.Image.length)+(task.Spec.ContainerSpec.Image.indexOf(":")))}
                    serviceName={service.Spec.Name}/>
                </div>
              ))}
          </span>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  task : state.swarmState.tasks.filter((task) => task.ID === props.taskId)[0],
  service : state.swarmState.services.find((service) => service.ID === props.serviceId),
});
export default connect(mapStateToProps, actions)(SwarmVizLabelParser);