import {useState} from 'react'
import Button from 'react-bootstrap/Button'

function AddButton({ handleClick}) {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
       setIsHover(true);
    };
 
    const handleMouseLeave = () => {
       setIsHover(false);
    };

    const btn = { 
        position: "fixed",
        top: "20%",
        right: "2%",
        transform: "translate(-50%, -50%)",
        zIndex: "2",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 1s ease-in-out",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        overflow: "hidden",
        border: "none",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        backgroundColor: isHover ? 'white' : 'rgba(0, 0, 0, 0.5)',
        color: isHover ? 'rgba(0, 0, 0, 0.5)' : 'white',
      }

  return (
    <Button style={btn} onClick={() => handleClick()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Add a new trip
    </Button>
  )
}

export default AddButton
