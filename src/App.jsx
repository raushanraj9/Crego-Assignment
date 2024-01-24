import ExpressionForm from './components/ExpressionForm'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  
  return (
    <>
    <div 
  className="d-flex justify-content-center align-items-center px-4 text-light" 
  style={{
    height: "100px",
    backgroundColor: "#2c3e50", // Darker background color
    fontSize: "28px", // Slightly larger font size
    borderRadius: "8px", // Rounded corners
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle box shadow
  }}
>
  Expression Engine 
</div>
<div
  className="d-flex justify-content-center align-items-center flex-column"
  style={{
    backgroundColor: "#ecf0f1", // Light background color
    padding: "20px", // Padding for inner content
    borderRadius: "8px", // Rounded corners
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle box shadow
    marginTop: "20px", // Top margin for separation
  }}
>
  <ExpressionForm />
</div>

    </>
  )
}

export default App



