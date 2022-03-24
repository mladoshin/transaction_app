import React from "react"
import './App.css';
import FormWrapper from "./components/formWrapper";
import Navbar from "./components/navbar";
import TransactionForm from "./components/transactionForm";

function App() {
  return (
    <div className="App">
      {/* Navigation bar */}
      <Navbar/>

      {/* Main content */}
      <FormWrapper>
        <TransactionForm/>
      </FormWrapper>
    </div>
  );
}

export default App;
