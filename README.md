# AWS-S3

This example project implements a Node.js API for working with AWS S3. It allows uploading, reading, and deleting files
in an S3
bucket using the AWS SDK for JavaScript (v3). The S3 bucket is configured with logging for all requests and Object Lock
to prevent files from being deleted or modified for a specified retention period.

## Task

Create bucket where objects can’t be modified and all requests are logged.

## Step-by-Step Bucket Setup

1. Create a bucket with Object Lock enabled:

- Open the AWS S3 Console and click Create bucket.
- Enter a unique bucket name, select a region, and enable Object Lock.
- Click Create bucket. After creation, Object Lock settings cannot be changed.

2. Configure Object Lock:

- Open the bucket and go to the Properties tab.
- Scroll down to Object Lock and click Edit.
- Enable Object Lock and choose Compliance mode.
- Set a retention period, e.g., 30 days.
![object-lock](/images/object-lock.png)

3. Create a separate bucket for logs:

- Go back to the S3 Console and click Create bucket again.
- Enter a unique bucket name for the logging bucket and select the same region as the main bucket.
- This bucket does not need Object Lock enabled.
- Click Create bucket.
![backets](/images/backets.png)

4. Enable logging for the same bucket:

- In the Properties tab of the main bucket, scroll down to Server access logging.
- Click Edit, enable logging, and choose the separate bucket created in step 3 as the target for storing logs.
- (Optional) Set a prefix for logs, e.g., logs/.
![loging](/images/loging.png)

## Project Structure

```text
s3-app/
├── downloads/                     # Folder for downloaded files
├── src/
│   ├── config/
│   │   └── awsConfig.ts           # AWS SDK configuration
│   ├── routes/
│   │   └── fileRoutes.ts          # API routing
│   ├── services/
│   │   └── s3Service.ts           # Logic for working with S3
│   ├── app.ts                     # Express setup
│   └── index.ts                   # Entry point
├── .env.example                   # Example environment variables
├── example.txt                    # Sample file for uploading
```

## Project Setup

1. Clone the repository and navigate to the project directory.

````bash
git clone <url-to-repo>
cd <folder-repo>
````

2. Install dependencies.

````bash
npm install 
````

3. Create a .env file based on .env.example and fill in your AWS credentials:

````bash
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
MAIN_BUCKET_NAME=your-main-bucket-name
LOG_BUCKET_NAME=your-log-bucket-name
PORT=3000
````

4. Start the project:

````bash
npm run start
````

## API Endpoints

The API is available at http://localhost:3000.

1. Upload a file:
    - Endpoint: /file/upload
    - Method: POST
    - Description: Uploads example.txt to the main S3 bucket with Object Lock, preventing deletion.
    - cURL command example:

````bash
curl -I -X POST http://localhost:3000/file/upload
````

2. Download a file:
    - Endpoint: /file/download
    - Method: GET
    - Description: Downloads example.txt from the main S3 bucket and saves it as downloaded_example.txt in the downloads
      directory.
    - cURL command example:

````bash
curl -I -X GET http://localhost:3000/file/download
````

3. Delete a file:
    - Endpoint: /file/delete
    - Method: DELETE
    - Description: Attempts to delete example.txt from the main S3 bucket (deletion will be blocked if Object Lock is
      active).
    - cURL command example:

```bash
curl -I -X DELETE http://localhost:3000/file/delete
```