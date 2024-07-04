import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase.config.js';

export const fileUploader = async ({ file, type }) => {
    let folder = 'coverPhoto';
    if (type === 'audio') folder = 'audio';
    if (type === 'profile') folder = 'profilePhoto'

    const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
      
            },
            (error) => {
              console.log('File Upload Error', error);
            },
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(url); // Resolve the promise with the URL
                } catch (error) {
                    console.log('Error in getting download URL', error);
                    reject(error); // Reject the promise with the error
                }
            }
        )
    })
}

export const fileDeleter = async ({ url }) => {
    const deleteRef = ref(storage, url);

    return new Promise((resolve, reject) => {
        deleteObject(deleteRef)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log('File deletion failed', error);
                reject(error);
            });
    });
};