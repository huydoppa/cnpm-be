const express = require('express');
const createError = require('http-errors');
const cors = require('cors')
const Admin = require('./Models/Admin.model');
const dotenv = require('dotenv').config();
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('upload'))
app.use('/static', express.static('upload'))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //files khi upload xong sẽ nằm trong thư mục "uploads" này - các bạn có thể tự định nghĩa thư mục này
    cb(null, 'upload') 
  },
  filename: function (req, file, cb) {
    // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, filename + '-' + file.originalname )
  }
})
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const upload = multer({ storage: storage })
app.post('/admin/uploadImage', upload.single('file'), (req, res, next) => {
  //nhận dữ liệu từ form
  const file = req.file;
  // Kiểm tra nếu không phải dạng file thì báo lỗi
  if (!file) {
      const error = new Error('Upload file again!')
      error.httpStatusCode = 400
      return next(error)
    }
  // file đã được lưu vào thư mục uploads
  // gọi tên file: req.file.filename và render ra màn hình
  res.sendFile(__dirname + `/upload/product/${req.file.filename}`);
  link = 'http://10.10.19.2:1337' + `/static/${req.file.filename}`;
  return res.json({'location':link})
})


//Initialize DB
require('./initDB')();

app.use(bodyParser.json());

const Route = require('./Routes/route');
app.use('/', Route);
//404 handler and pass to error handler
app.use((req, res, next) => {
    /*
    const err = new Error('Not found');
    err.status = 404;
    next(err);
    */
    // You can use the above code if your not using the http-errors module
    next(createError(404, 'Not found'));
  });

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });



const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT + '...');
  });