document.getElementById('serviceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        device: formData.get('device'),
        problem: formData.get('problem'),
        timestamp: new Date().toLocaleString('id-ID')
    };

    try {
        const response = await fetch('/api/telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.success) {
            alert('✅ Permintaan service berhasil dikirim!');
            this.reset();
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        alert('❌ Gagal mengirim permintaan. Silakan coba lagi.');
    }
});
