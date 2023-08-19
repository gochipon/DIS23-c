import React, { useState } from 'react';
import './App.css';
import { CircularProgress, TextField, Button, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

// curl -X POST -H "Content-Type: application/json" -d '{"prompt":"Hello, how are you?","pluginName":"default"}' http://127.0.0.1:8080/chatGPT

function App() {
	const url_base = "http://127.0.0.1:8080";

	const [inputText, setInputText] = useState('');
	const [loading, setLoading] = useState(false);
	const [outputText, setOutputText] = useState('');

	const handleInputChange = (event) => {
		setInputText(event.target.value);
	};

	const data = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			prompt: inputText,
			pluginName: "developer"
		})
	};

	const handleSubmit = () => {
		fetch(url_base + "/chatGPT", data)
			.then((res) => {
				console.log(res);
				return res.text();
			})
			.then((data) => {
				console.log('Success:', data);
				setLoading(false);
				setOutputText(data);
			})
			.catch((error) => {
				console.error('Error:', error);
				setLoading(false);
			});
	}  

	return (
		<div className="App">
			<Typography variant="h3" component="div" gutterBottom>
				Group C
			</Typography>

			<Box className="text-container"
				sx={{ width: '100%', maxWidth: 500, margin: 2 }}>
				<Typography variant="h5" component="div" gutterBottom>
					テキストによる対話
				</Typography>
				<TextField
					id="outlined-multiline-flexible"
					label="テキストを入力してください"
					multiline
					maxRows={4}
					value={inputText}
					onChange={handleInputChange}
				/>
				<Button type="submit" variant="contained" onClick={handleSubmit}>送信</Button>
			</Box>

			{loading 
			?
				<CircularProgress />
			:
				null
			}
			{outputText && !loading ?
				<p>結果: {outputText}</p>
			:
			null
			}
			<div className="cat-container">
				<img id="cat" src="/img/cat.png" alt="cat" />
			</div>
		</div>
	);
}

export default App;