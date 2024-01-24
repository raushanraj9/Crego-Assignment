import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaTrash } from "react-icons/fa6";

const ExpressionForm = () => {
  const [expression, setExpression] = useState({
    key: "",
    output: { value: "", operator: "", score: "" },
  });

  const [combinator, setCombinator] = useState("and");

  const [showJson, setShowJson] = useState(false);

  const [jsonFormat, setjsonFormat] = useState(false);

  const [rulesArray, setRulesArray] = useState([]);

  const sequence = () => {
    let count = 1;
    return () => count++;
  };

  const id = sequence();

  const handleType = (e) => {
    const newExpression = { ...expression, key: e.target.value };
    setExpression(newExpression);
  };

  const handleOperator = (e) => {
    const newExpression = {
      ...expression,
      output: { ...expression.output, operator: e.target.value },
    };
    setExpression(newExpression);
  };

  const handleValue = (e) => {
    const newExpression = {
      ...expression,
      output: { ...expression.output, value: e.target.value },
    };
    setExpression(newExpression);
  };

  const handleScore = (e) => {
    const newExpression = {
      ...expression,
      output: { ...expression.output, score: e.target.value },
    };
    setExpression(newExpression);
  };

  const addExpression = (e) => {
    e.preventDefault();
    const newRule = [...rulesArray, { ...expression }];
    setRulesArray(newRule);
    setShowJson(false);
    setExpression({
      key: "",
      output: { value: "", operator: "", score: "" },
    });
  };

  const handleDelete = (i) => {
    const editedRules = [...rulesArray];
    editedRules.splice(i, 1);
    setRulesArray(editedRules);
    setShowJson(false);
  };

  const handleCombinator = (e) => {
    setCombinator(e.target.value);
  };

  const handleGenerateJson = () => {
    const rules = [...rulesArray];
    const newJson = { rules, combinator };
    setjsonFormat(JSON.stringify(newJson));
    setShowJson(true);
    console.log(JSON.stringify(newJson));
  };

  return (
    <div className="m-4 border border-light rounded p-3" style={{ backgroundColor: "#f5f5f5" }}>
      <Form
        className="d-flex justify-content-evenly align-items-center w-100 overflow-auto inputForm p-2"
        onSubmit={addExpression}
      >
        <Form.Group>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleType}
            id="type"
            value={expression.key}
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

        <Form.Group>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleOperator}
            id="Operator"
            value={expression.output.operator}
            required 
            style={{marginLeft:"5px" }}
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
            style={{ borderColor: "grey", height: "35px",marginLeft:"10px" }}
            placeholder="Value"
            value={expression.output.value}
            onChange={handleValue}
            required
          />
        </Form.Group>
        <Form.Group>
          <input
            type="text"
            id="score"
            className="border rounded p-2 d-flex justify-content-evenly align-items-center inputWidth"
            style={{ borderColor: "grey", height: "35px",marginLeft:"5px" }}
            placeholder="Score"
            value={expression.output.score}
            onChange={handleScore}
            required
          />
        </Form.Group>
        <Form.Group>
        <input
  type="radio"
  id="and"
  name="combinator"
  value="and"
  onChange={handleCombinator}
  style={{
    marginLeft: "6px",
    backgroundColor: "#3498db", // Blue background color
    border: "none", // Remove default border
    borderRadius: "50%", // Make it a circle
    cursor: "pointer", // Show hand cursor on hover
  }}
/>

          <label 
  htmlFor="and" 
  style={{
    marginRight: "6px",
    padding: "8px",
    backgroundColor: "#3498db", // Blue background color
    color: "#fff", // White text color
    borderRadius: "4px", // Rounded corners
    cursor: "pointer", // Show hand cursor on hover
  }}
>
  AND
</label>


<input
  type="radio"
  id="or"
  name="combinator"
  value="or"
  onChange={handleCombinator}
  style={{
    // marginLeft: "0px",
    backgroundColor: "#e74c3c", // Red background color
    border: "none", // Remove default border
    borderRadius: "50%", // Make it a circle
    cursor: "pointer", // Show hand cursor on hover
  }}
/>

          <label 
  htmlFor="or" 
  style={{
    marginLeft: "1px",
    padding: "8px",
    backgroundColor: "#e74c3c", // Red background color
    color: "#fff", // White text color
    borderRadius: "4px", // Rounded corners
    cursor: "pointer", // Show hand cursor on hover
  }}
>
  OR
</label>

        </Form.Group>

        
        <Button
  variant="primary"
  type="submit"
  style={{
    backgroundColor: "#27ae60", // Green background color
    color: "#fff", // White text color
    borderRadius: "4px", // Rounded corners
    padding: "10px 20px", // Adjust padding for better appearance
    fontSize: "18px", // Font size
    border: "none", // Remove default button border
    cursor: "pointer", // Show hand cursor on hover
    marginLeft: "10px", // Add margin-top for spacing
  }}
>
  Add
</Button>

      </Form>

      {rulesArray.length !== 0 && (
        <div className="p-3 tableDiv overflow-auto">
          <table
            className="table table-bordered table-hover expTable"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <thead>
              <tr>
                <th scope="col">Expression_Id</th>
                <th scope="col">Type</th>
                <th scope="col">Operator</th>
                <th scope="col">Value</th>
                <th scope="col">Score</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {rulesArray.map((data, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{id()}</th>
                    <td>{data.key}</td>
                    <td>{data.output.operator}</td>
                    <td>{data.output.value}</td>
                    <td>{data.output.score}</td>
                    <td>
                      <FaTrash onClick={() => handleDelete(i)} style={{
                        color: 'red', // Set the color to red
                        cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
                        fontSize: '1.2em', // Adjust the font size as needed
                        marginRight: '5px', // Add some right margin for spacing
                      }}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {rulesArray.length !== 0 && (
        <Button
        variant="primary"
        type="submit"
        style={{
            margin: "2px",
            backgroundColor: "#3498db", // Add your desired background color
            color: "#fff", // Add your desired text color
            borderRadius: "5px", // Add border radius for rounded corners
            padding: "10px 20px", // Add padding for a comfortable size
            display: "block", // Make it a block element
            margin: "auto", // Center the button horizontally
            cursor: "pointer", // Show pointer cursor on hover
          }}
          onClick={handleGenerateJson}
        >
          Generate JSON
        </Button>
      )}
      {showJson && (
        <div className="jsonWidth" style={{ margin: "10px", background: "#f0f0f0", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
          <pre style={{ fontSize: "14px", whiteSpace: "pre-wrap", margin: "0" }}>{jsonFormat}</pre>
        </div>
      )}
    </div>
  );
};

export default ExpressionForm;
