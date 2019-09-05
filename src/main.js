import { getRequestHeaders } from './auth';

function listDriveFile() {
  getRequestHeaders().then(headers => console.log(headers));
}

listDriveFile();
