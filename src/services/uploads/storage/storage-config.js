import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { ClientError } from '../../../exceptions/index.js';

// membuat path folder penyimpanan file
/*
process.cwd adalah method yang mengembalikan direktori root proyek, sehingga alamat lengkapnya menjadi c:/dokumen/backend-dengan-express/kelas-menengah/bookshelf-api
*/
export const UPLOAD_FOLDER = path.resolve(process.cwd(), 'src/services/uploads/files/images');

if(!fs.existsSync(UPLOAD_FOLDER)) {
    // jika tidak exist, maka buat folder berserta parentnya
    fs.mkdirSync(UPLOAD_FOLDER, {recursive: true});
}

// konfigurasi storage multer
const storage = multer.diskStorage({
    // menentukan lokasi penyeimpnana
    destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
    // membuat nama file
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
});

export const upload = multer({
    // menggunakan konfigurasi sebelumnya
    storage,
    // menentukan ukuran maksimal file
    limits: { fileSize: 5 * 1024 * 1024 },
    // menambahkan filter file
    fileFilter: (req, file, cb) => {
        if(file.mimetype && file.mimetype.startsWith('image/')) cb(null, true)
        else (new ClientError("only image are allowrd"), null);
    }
});

export default { UPLOAD_FOLDER, storage, upload }