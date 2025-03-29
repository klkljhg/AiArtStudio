document.addEventListener('DOMContentLoaded', () => {
    const API_TOKEN = "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"; // Replace with your token
    const generateBtn = document.getElementById('generateBtn');
    const promptInput = document.getElementById('prompt');
    const sizeSelect = document.getElementById('size');
    const loadingDiv = document.querySelector('.loading');
    const outputImage = document.getElementById('outputImage');
    const downloadBtn = document.getElementById('downloadBtn');

    generateBtn.addEventListener('click', async () => {
        const prompt = promptInput.value.trim();
        const size = sizeSelect.value.split('x');

        if (!prompt) {
            alert('Please enter a description');
            return;
        }

        // Show loading
        generateBtn.disabled = true;
        loadingDiv.style.display = 'block';
        outputImage.style.display = 'none';
        downloadBtn.style.display = 'none';

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        inputs: prompt,
                        parameters: {
                            width: parseInt(size[0]),
                            height: parseInt(size[1])
                        }
                    }),
                }
            );

            if (!response.ok) throw new Error('Generation failed');

            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);

            outputImage.src = imgUrl;
            outputImage.style.display = 'block';
            downloadBtn.href = imgUrl;
            downloadBtn.download = `ai-art-${Date.now()}.png`;
            downloadBtn.style.display = 'inline-block';

        } catch (error) {
            console.error(error);
            alert('Error generating image. Please try again.');
        } finally {
            generateBtn.disabled = false;
            loadingDiv.style.display = 'none';
        }
    });
});