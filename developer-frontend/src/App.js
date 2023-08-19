import React, { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('アップロードに成功しました');
      } else {
        setMessage('アップロードに失敗しました');
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      setMessage('アップロードに失敗しました');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h1>ファイルをアップロードしてください</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>アップロード</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default App;