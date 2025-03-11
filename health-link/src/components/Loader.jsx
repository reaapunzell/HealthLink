import logo from "/src/assets/Healthlink-logo.svg";
import "/assets/style.css";

const Loader = () => {
    return(     
        <div className="loader-container">
        <img src={logo} alt="Loading..." className="loader" />
      </div>
    );
};

export default Loader;