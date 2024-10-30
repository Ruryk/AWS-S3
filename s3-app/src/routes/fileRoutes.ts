import express from 'express';

import { uploadFile, downloadFile, deleteFile } from '../services/s3Service';

const router = express.Router();

router.post('/upload', async (req, res) => {
    try {
        const data = await uploadFile();
        res.status(200).json({ message: 'File uploaded successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file' });
    }
});

router.get('/download', async (req, res) => {
    try {
        await downloadFile();
        res.status(200).json({ message: 'File downloaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error downloading file' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const data = await deleteFile();
        res.status(200).json({ message: 'File deleted successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting file' });
    }
});

export default router;
