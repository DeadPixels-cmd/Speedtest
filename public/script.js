async function testDownload() {
  const start = performance.now();
  const response = await fetch('/download?cache=' + Date.now(), { cache: 'no-store' });
  const data = await response.arrayBuffer();
  const end = performance.now();

  const duration = (end - start) / 1000;
  const bitsLoaded = data.byteLength * 8;
  return (bitsLoaded / duration / 1_000_000).toFixed(2);
}


async function testUpload(){
    const data = new Uint8Array(5*1024*1024);
    data.fill(1);
    const start = performance.now();
    await fetch('/upload', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({data: Array.from(data) })
    });

    const end = performance.now();
    const duration = (end - start) / 1000;
    const bitsSent = data.byteLength * 8;
    return (bitsSent / duration / 1_000_000).toFixed(2);
}

document.getElementById('start').addEventListener('click', async () =>{
    document.getElementById('download').textContent = 'Testing ...';
    document.getElementById('upload').textContent = 'Testing ...';

    const downloadSpeed = await testDownload();
    document.getElementById('download').textContent = downloadSpeed;

    const uploadSpeed = await testUpload();
    document.getElementById('upload').textContent = uploadSpeed;

});