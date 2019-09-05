import { getRequestHeaders } from './auth';

async function listDriveFile(): Promise<void> {
  const headers = await getRequestHeaders();

  console.log(headers);
}

listDriveFile();
