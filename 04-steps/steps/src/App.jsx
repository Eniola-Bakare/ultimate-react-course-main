import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  // const [step, setStep] = React.useState(1);
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleStepIncre = () =>
    setStep((prevStep) => (prevStep === 3 ? 3 : ++prevStep));
  const handleStepDecre = () =>
    setStep((prevStep) => (prevStep === 1 ? 1 : --prevStep));

  const handleClose = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleStepDecre}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleStepIncre}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
