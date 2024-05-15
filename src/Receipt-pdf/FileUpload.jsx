import { useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append("file", file);

        // Enviar el archivo al servidor
        fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Datos JSON devueltos del servidor
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload PDF
            </button>
        </div>
    );
}

export default FileUpload;
