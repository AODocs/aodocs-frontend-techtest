import { getRequestHeaders } from './auth';
import moment from 'moment';

let selected = [],
    historyToken = [],
    nextPageToken = "",
    isLoadingContent = false;

//Waiting for DOM load
window.addEventListener("DOMContentLoaded", () => {
  let starButton = document.querySelector('.files-actions .star'),
      unstarButton = document.querySelector('.files-actions .unstar');
  
  //Listening event for infinite pagination
  window.addEventListener('scroll', () => {
    if (!historyToken.find(id => id == nextPageToken) && !isLoadingContent && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      listDriveFile();
    }
  });

  //Adding click listener for starring actions
  starButton.addEventListener('click', starSelected);
  unstarButton.addEventListener('click', unstarSelected);
  
  listDriveFile();
});

function listDriveFile() {
  isLoadingContent = true;
  getRequestHeaders().then(headers => 
    {
      let options = {
        headers
      };

      let fields = {
        files: [
          "id",
          "webViewLink",
          "mimeType",
          "iconLink",
          "thumbnailLink",
          "name",
          "modifiedTime"
        ],
      };

      fetch(`https://www.googleapis.com/drive/v3/files?pageSize=25&fields=nextPageToken${convertFields(fields)}&pageToken=${nextPageToken}`, options)
        .then(res => res.json()).then(data => {
          if (data && data.files) {
            console.log(data);

            //Setting old and next page token
            if (data.nextPageToken) {
              historyToken.push(nextPageToken);
              nextPageToken = data.nextPageToken;
            }

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

              //Set thumbnail based on type
              thumb.style.backgroundImage = `url(${(itemType !== 'folder') ? file.thumbnailLink : file.iconLink})`;

              //Adding eventlisterners for files actions
              thumb.addEventListener('click', () => openLink(file.webViewLink));
              informations.addEventListener('click', () => toggleSelectItem(newBox));

              container.appendChild(newBox);
            });
          }
        }).then(() => {
          isLoadingContent = false;
        }).catch(console.error);
    });
}

function convertFields(fields) {
  let result = "";
  for (let key in fields) {
    fields[key].forEach(val => {
      result += `,${key}/${val}`;
    });
  }
  return result;
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

  //Updating visual
  updateSelectedCount();
  toggleActions();
}

function updateSelectedCount() {
  let counter = document.querySelector('.selected-count');
  counter.innerText = (selected.length > 0) ? `${selected.length} item${selected.length > 1 ? 's' : ''} selected` : '';
}

function toggleActions() {
  let buttons = document.querySelectorAll('.files-actions .btn');
  if (selected.length > 0){
    buttons.forEach(button => button.classList.remove('disabled'))
  } else {
    buttons.forEach(button => button.classList.add('disabled'))
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

function starSelected() {
  console.log('starSelected')
}

function unstarSelected() {
  console.log('unstarSelected')
}
