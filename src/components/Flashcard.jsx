import {useState} from 'react'

export default function Flashcard({questions}){
    let [front, setFront] = useState(true);
    
    let randomIndex = Math.floor(Math.random() * questions.length);

    function handleNextClick(){
        randomIndex = Math.floor(Math.random() * questions.length);
    };

    return(
        <div>
            <div>
                {front? 
                    (<p onClick = {() => {setFront(!front)}}>{questions[randomIndex].question}</p>): 
                    (<p onClick = {() => {setFront(!front)}}>{questions[randomIndex].answer}</p>)}
            </div>
            <button type = "button" onClick = {handleNextClick}> Next </button>
        </div>
    );
}