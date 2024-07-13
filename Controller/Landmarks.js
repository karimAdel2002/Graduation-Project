import { exec } from 'child_process';

function runStreamlitScript(callback) {
    const streamlitCommand = 'streamlit run Landmarks/streamlit_script.py';  // Update path to your script
    exec(streamlitCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Streamlit script: ${error.message}`);
            callback(error, null);
            return;
        }

        if (stderr) {
            console.error(`Streamlit script error: ${stderr}`);
            callback(stderr, null);
            return;
        }

        console.log(`Streamlit script output: ${stdout}`);
        callback(null, stdout);
    });
}


export const index = async (req, res) => { 
    runStreamlitScript((err, results) => {
        if (err) {
            res.status(500).send('Error running Streamlit script');
        } else {
            res.send('Streamlit script is running...');
        }
    });
    res.status(204).send()
};