import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/assets/style.css";
import diabetesIcon from "/src/assets/diabetes-icon.svg";
import asthmaIcon from "/src/assets/asthma-icon.svg";
import hypertensionIcon from "/src/assets/hypertension-icon.svg";

const OverviewConditions = () => {
  const navigate = useNavigate();

  //sample data
  const conditions = [
    {
      id: 1,
      title: "Asthma",
      description: "Learn about asthma symptoms and treatments",
      icon: `${asthmaIcon}`,
      articlePath: "/articles/asthma", //
    },
    {
      id: 2,
      title: "Diabetes",
      description: "Managing diabetes effectively",
      icon: `${diabetesIcon}`,
      articlePath: "/articles/diabetes",
    },
    {
      id: 3,
      title: "Hypertension",
      description: "Understanding high blood pressure",
      icon: `${hypertensionIcon}`,
      articlePath: "/articles/hypertension",
    },
  ];

  const handleCardClick = (articlePath) => {
    navigate(articlePath);
  };

  return (
    <div className="overview-conditions-container">
      <h3>Overview Conditions</h3>

      <div className="overview-conditions-cards">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            className="condition-card"
            onClick={() => handleCardClick(condition.articlePath)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && handleCardClick(condition.articlePath)
            }
          >
            <img
              src={condition.icon}
              alt={`${condition.title} icon`}
              className="condition-icon"
            />
            <div className="card-content">
              <h3 className="condition-title">{condition.title}</h3>
              <p className="condition-description">{condition.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewConditions;
