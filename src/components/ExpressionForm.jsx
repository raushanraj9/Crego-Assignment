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
            style={{ borderColor: "grey", height: "35px" }}
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
            style={{ marginRight: "6px" }}
          />
          <label htmlFor="and" style={{ marginRight: "6px" }}>
            AND
          </label>

          <input
            type="radio"
            id="or"
            name="combinator"
            value="or"
            onChange={handleCombinator}
            style={{ marginRight: "6px" }}
          />
          <label htmlFor="or">OR</label>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>

      {rulesArray.length !== 0 && (
        <div className="p-3 tableDiv overflow-auto">
          <table
            className="table border expTable"
            style={{ borderRadius: "10px" }}
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
                      <FaTrash onClick={() => handleDelete(i)} />
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
          type="button"
          style={{ margin: "2px" }}
          onClick={handleGenerateJson}
        >
          Generate JSON
        </Button>
      )}
      {showJson && (
        <div className="jsonWidth" style={{ margin: "10px" }}>
          {jsonFormat}
        </div>
      )}
    </div>
  );
};

export default ExpressionForm;
