import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  //to be updated with every click - making it dynamic
  //hook - includes a use keyword
  //needs to be called on top of component

  const [step, setStep] = useState(1);

  // event handler function - used to handle the event
  function handlePrevios() {
    if (step > 1) setStep(step - 1);
  }

  function handleNext() {
    if (step < 3) setStep(step + 1);
  }

  return (
    <div className="steps">
      <div className="numbers">
        {/* conditional styling - styling depending on the status */}
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      {/* displays the message based on the step  */}
      <p className="message">
        Step{step} {messages[step - 1]}
      </p>
      <div className="buttons">
        {/* Function executed when click is generaetd */}
        {/* uses on click prop */}
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevios}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
