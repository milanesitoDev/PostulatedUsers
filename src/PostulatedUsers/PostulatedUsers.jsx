function DownloadPDF() {
    const jobId = '123'; // O el ID que deseas probar

    const onDownloadPDF = () => {
        fetch(`http://localhost:4000/api/generate-pdf?jobId=${jobId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Applicants.pdf'); // Asegúrate de que el nombre del archivo sea el deseado
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error downloading PDF:', error));
    };

    return (
        <div>
            <h1>Postulated users</h1>
            <button onClick={onDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default DownloadPDF;
