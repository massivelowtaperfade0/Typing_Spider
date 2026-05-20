import React, { useEffect } from "react";
import '..//styles/Stats.css';
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Bounce, toast } from "react-toastify";

const Stats = (
    {wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedChars,
    extraChars,
    graphData}
) => {

    let  timeSet = new Set();
    const newGraph = graphData.filter( i => {
        if(!timeSet.has(i[0])){
            timeSet.add(i[0]);
            return i;
        }
    });

    const pushDataToDB = () => {

        if(isNaN(accuracy)){
            toast.error('Invalid Test', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
               });
               return;
        }

        const resultRef = collection(db, 'Results');
        const uid = auth.currentUser?.uid;
        if(!uid) return;
        
        addDoc(resultRef, {
            wpm: wpm,
            accuracy: accuracy,
            characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
            timestamp: new Date(),
            userId: uid
        }).then((res) => {
            toast.success('Data saved to DB', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }).catch((err) => {
            toast.error('Not able to save results', {
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: true,
                 closeOnClick: false,
                 pauseOnHover: true,
                 draggable: false,
                 progress: undefined,
                 theme: "light",
                 transition: Bounce,
                });
        })
    }

    useEffect(() => {
        if(auth.currentUser){
            pushDataToDB();
        }else{
            toast.warning('Login to save resutls', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
               });
        }
    }, [])

    return (
        <div className="stats-box">

            <div className="left-stats">
                <div className="title">WPM</div>
                <div className="subtitles">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="subtitles">{accuracy}</div>
                <div className="title">Characters</div>
                <div className="subtitles">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
            </div>

            <div className="right-stats">
                {/*Graph to be displayed*/}
                <Graph graphData={newGraph}/>

            </div>

        </div>
    )
}

export default Stats;