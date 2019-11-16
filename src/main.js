import { getRequestHeaders } from './auth';
import moment from 'moment';

let selected = [];



function listDriveFile() {
  getRequestHeaders().then(headers => 
    {
      let options = {
        headers
      };

      fetch('https://www.googleapis.com/drive/v3/files?pageSize=25&fields=files/webViewLink,files/mimeType,files/iconLink,files/thumbnailLink,files/name,files/modifiedTime', options)
        .then(res => res.json()).then(data => {
          if (data && data.files) {

            let container = document.querySelector('#content'),
                folderContainer = document.querySelector('#content-folders');
            let fileBox = document.querySelector('.file-box');

            
            data.files.forEach(file => {
              console.log(file);
              let newBox = fileBox.cloneNode(true),
                  title = newBox.querySelector('.title'),
                  icon = newBox.querySelector('.icon'),
                  timestamp = newBox.querySelector('.timestamp'),
                  thumb = newBox.querySelector('.thumb');
              
              let itemType = filterMime(file.mimeType);
              
              newBox.classList.remove('hidden');
              icon.style.backgroundImage = ` url(${file.iconLink})`;
              title.innerText = file.name;
              timestamp.innerText = `Modified ${moment(file.modifiedTime).fromNow()}`;
              newBox.addEventListener('click', () => openLink(file.webViewLink));

              if (itemType !== 'folder') {
                thumb.style.backgroundImage = `url(${file.thumbnailLink || file.iconLink})`;
                container.appendChild(newBox);
              } else {
                thumb.classList.add('hidden');
                timestamp.classList.add('hidden');
                folderContainer.appendChild(newBox);
              }

            });
          }
        }).catch(console.error);
    });
}

function openLink(link) {
  window.open(link, '_blank');
}

function filterMime(mime) {
  return mime.replace("application/vnd.google-apps.", "");
}

function toggleItem(item) {
  console.log(item);
}

listDriveFile();
