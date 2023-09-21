import React from 'react'
import randomColor from "randomcolor";

export default function RandomColor() {
    const [color, setColor] = React.useState("");

    React.useEffect(() => {
        setColor(randomColor());
    }, []);

  return (
    <div data-testid="randomColor" style={{backgroundColor: color}}>
        <h1>Random Color</h1>
    </div>
  )
}
