import { getRequestHeaders } from './auth';
import moment from 'moment';
import { File } from './models/file'

/**
 * @desc List files of a Google Drive
 * @param string previousPageToken - Token of the previous page, empty as default
 * @param string nextPageToken @optional - Token of the next page
 */
async function listDriveFile(): Promise<void> {
    const headers = await getRequestHeaders();

    const init = {
        method: 'GET',
        headers
    };

    fetch(`https://www.googleapis.com/drive/v3/files?
			pageSize=25
			&fields=
				files/name,
				files/thumbnailLink,
				files/modifiedTime
		`, init)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('list');
            list!.innerHTML = '';

            data.files.forEach((el: File) => {
                // Create a 'li' element for every file
                const li = document.createElement('li');
                const content = document.createElement('p');

                content.textContent = el.name;
                if (el.modifiedTime) content.textContent += ", modified " + moment(el.modifiedTime).fromNow();
                if (el.thumbnailLink) {
                    // Create an img element
                    const img = document.createElement('img');
                    img.setAttribute('src', el.thumbnailLink);

                    li.appendChild(img);
                }
                li.appendChild(content);

                list!.appendChild(li);
            });
        });
}

listDriveFile();
