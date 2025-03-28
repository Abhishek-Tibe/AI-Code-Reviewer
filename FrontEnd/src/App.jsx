import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import axios from "axios"
import MarkDown from "react-markdown"
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState(`function sum() {
  return 1;
}`)
  const [ review, setReview ] = useState(``)
  
  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode() {
    const response = await axios.post('http://localhost:4000/ai/get-review', { code })
    // console.log(response.data)
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                  fontFamily: "monospace",
                  fontSize: 14,
                  border: "1.15px solid white",
                borderRadius: "10px",
                  overflow: "hidden",
                  height: "100%",
                  color: "white",
                  backgroundColor: "black",
                  width: "100%"
                }}
            />
          </div>
          <div
            onClick={reviewCode}
            onTouchStart={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <MarkDown>
            { review }
          </MarkDown>
        </div>
      </main>
    </>
  )
}



export default App
