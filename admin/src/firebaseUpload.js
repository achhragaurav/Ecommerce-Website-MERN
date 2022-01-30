import {  deleteObject } from "firebase/storage";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import app from "./firebase";

export const uploadImageAndGetURL = async(file, functionURL) =>{
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {

        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            functionURL(downloadURL)
        });
      }
    );
}


export const deleteImages = (link) =>{

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, link);

// Delete the file
deleteObject(desertRef).then(() => {
  console.log("Previous File Deleted");
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
  console.log(error);
});
}