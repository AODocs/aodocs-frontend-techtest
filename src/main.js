import { getRequestHeaders } from './auth';
import moment from 'moment';

let selected = [];

function listDriveFile() {
  getRequestHeaders().then(headers => 
    {
      let options = {
        headers
      };

      fetch('https://www.googleapis.com/drive/v3/files?pageSize=25&fields=files/id,files/webViewLink,files/mimeType,files/iconLink,files/thumbnailLink,files/name,files/modifiedTime', options)
        .then(res => res.json()).then(data => {
          if (data && data.files) {

            let container = document.querySelector('#content');
            let fileBox = document.querySelector('.file-box');

            data.files.forEach(file => {
              // console.log(file);

              //References to main and childs tags
              let newBox = fileBox.cloneNode(true),
                  title = newBox.querySelector('.title'),
                  icon = newBox.querySelector('.icon'),
                  timestamp = newBox.querySelector('.timestamp'),
                  informations = newBox.querySelector('.informations'),
                  thumb = newBox.querySelector('.thumb');
              
              //Getting file type based on MIME
              let itemType = filterMime(file.mimeType);

              //Adding file id to data set
              newBox.dataset.fileId = file.id;
              
              //Attribute content based on current data
              newBox.classList.remove('hidden');
              icon.style.backgroundImage = ` url(${file.iconLink})`;
              title.innerText = file.name;
              timestamp.innerText = `Modified ${moment(file.modifiedTime).fromNow()}`;

              //Adding eventlisterners for files actions
              thumb.addEventListener('click', () => openLink(file.webViewLink));
              informations.addEventListener('click', () => toggleSelectItem(newBox));

              //Set thumbnail based on type
              thumb.style.backgroundImage = `url(${(itemType !== 'folder') ? file.thumbnailLink : file.iconLink})`;
              container.appendChild(newBox);
            });
          }
        }).catch(console.error);
    });
}

function toggleSelectItem(item) {
  let id = item.dataset.fileId;
  let itemIndex = selected.indexOf(id);

  if (itemIndex > -1) {
    selected.splice(itemIndex, 1);
    item.classList.remove('selected');
  } else {
    selected.push(id);
    item.classList.add('selected');
  }
}

function openLink(link) {
  if (selected.length == 0) {
    window.open(link, '_blank');
  }
}

function filterMime(mime) {
  return mime.replace("application/vnd.google-apps.", "");
}

listDriveFile();
