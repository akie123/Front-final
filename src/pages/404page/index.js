import { Link } from 'react-router-dom';
import './404.css'
export default function ErrorPage (){
    return (
      <div className="mainbox">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-1" style={{paddingLeft : "3%"}}>
            <div className="err">4</div>
          </div>
          <div className="col-1" style={{color: "#ffffff",fontSize : "8.5rem",paddingTop : "20px"}}>
            <i className="far fa-question-circle fa-spin"></i>
          </div>
          <div className="col-1">
            <div className="err">4</div>
          </div>
        </div>

        <div className="container" style={{color : "white",marginLeft : "300px",textAlign : "center"}}>
          Maybe this page moved? Got deleted? Never
          existed in the first place?
          <p style={{color : "white"}}>
            Let's go <Link to="/">home</Link> and try from there.
          </p>
        </div>
      </div>
    );
}