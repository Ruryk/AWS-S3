import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { s3 } from '../config/awsConfig';

const BUCKET_NAME = process.env.BUCKET_NAME;

export const uploadFile = async () => {
    const fileContent = fs.readFileSync(path.join(__dirname, '../../example.txt'));
    const md5Hash = crypto.createHash('md5').update(fileContent).digest('base64');

    const params = {
        Bucket: BUCKET_NAME as string,
        Key: 'example.txt',
        Body: fileContent,
        ACL: 'bucket-owner-full-control' as any,
        ObjectLockMode: 'COMPLIANCE' as any,
        ObjectLockRetainUntilDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        ContentMD5: md5Hash
    };

    try {
        const command = new PutObjectCommand(params);
        const data = await s3.send(command);
        console.log('File uploaded successfully.');
        return data;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    }
};

export const downloadFile = async () => {
    const params = {
        Bucket: BUCKET_NAME as string,
        Key: 'example.txt'
    };

    try {
        const command = new GetObjectCommand(params);
        const data = await s3.send(command);

        const datString = await data.Body?.transformToString();

        if (datString) {
            fs.writeFileSync(path.join(__dirname, '../../downloads/downloaded_example.txt'), datString);
        }

        console.log('File downloaded successfully.');
        return data;
    } catch (err) {
        console.error('Error downloading file:', err);
        throw err;
    }
};

export const deleteFile = async () => {
    const params = {
        Bucket: BUCKET_NAME as string,
        Key: 'example.txt'
    };

    try {
        const command = new DeleteObjectCommand(params);
        const data = await s3.send(command);
        console.log('File deleted successfully.');
        return data;
    } catch (err) {
        console.error('Error deleting file:', err);
        throw err;
    }
};
