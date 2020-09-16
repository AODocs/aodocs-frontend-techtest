import { getRequestHeaders } from './auth.ts';

function listDriveFile() {
  getRequestHeaders().then((headers) => console.log(headers));
}

listDriveFile();
