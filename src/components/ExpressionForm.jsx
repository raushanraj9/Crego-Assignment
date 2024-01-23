import React from 'react'
import { useState } from 'react'
import Form from "react-bootstrap/Form";


function ExpressionForm() {
    //State variable
    const [inputData,setInputData]=useState({
        key: "",
        output: { value: "", operator: "", score: "" },
      });
      const [combinator, setCombinator] = useState("and");
      const [showJson, setShowJson] = useState(false);
      const [jsonFormat, setJsonFormat] = useState("");
      const [tableData, setTableData] = useState([]);

 // Function to generate unique IDs
  const generateId = (() => {
    let count = 1;
    return () => count++;
  })();


// Event handlers
  const handleType = (e) => {
    setInputData({ ...inputData, type: e.target.value });
  };
  const handleOperator = (e) => {
    setInputData({ ...inputData, operator: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newRow = { ...inputData, id: generateId() };
    setTableData([...tableData, newRow]);
    setInputData({ type: "", value: "", operator: "", score: "" });
    setShowJson(false);
  };
  const handleValue = (e) => {
    setInputData({ ...inputData, value: e.target.value });
  };

  return (
    <>
    <div className="m-4 border border-light rounded p-3">
        <Form
          className="d-flex justify-content-evenly align-items-center w-100 overflow-auto inputForm p-2"
          onSubmit={handleAdd}
        >
       <Form.Group className="mb-3">
  <select
    className="form-select"
    aria-label="Default select example"
    onChange={handleType}
    value={inputData.type}
    required
  >
    <option value="" hidden>
      Select Type
    </option>
    <option value="age">Age</option>
    <option value="credit_score">Credit Score</option>
    <option value="account_balance">Account Balance</option>
  </select>
</Form.Group>
<Form.Group className="mb-3">
  <select
    className="form-select"
    aria-label="Default select example"
    onChange={handleOperator}
    value={inputData.operator}
    required
  >
    <option value="" hidden>
      Select Operator
    </option>
    <option value="<">{`<`}</option>
    <option value=">">{`>`}</option>
    <option value=">=">{`>=`}</option>
    <option value="<=">{`<=`}</option>
    <option value="=">{`=`}</option>
  </select>
</Form.Group>

<Form.Group>
            <input
              type="text"
              id="value"
              className="border rounded p-2 d-flex justify-content-evenly align-items-center inputWidth"
              style={{ borderColor: "grey", height: "35px" }}
              placeholder="Value"
              value={inputData.value}
              onChange={handleValue}
              required
            />

</Form.Group>


        
        </Form>
        </div>
    </>
  )
}

export default ExpressionForm