// module.exports = (app) => {

//     const fileUpload = require('express-fileupload');

//     app.use(fileUpload({
//         createParentPath:true
//     }))

//     app.get('/find', (req, res) => {
    
//         res.json({"message": "Welcome, human"})
    
//     })
    

//     app.post('/upload', async (req, res) => {
//         console.log(req.files);
//         try{
//             if(!req.files){
//                 res.send({
//                     status: false,
//                     message: 'No file here'
//                 })
//             }else{
//                 let avatar = req.files.avatar;

//                 avatar.mv('../uploads/' + avatar.name);

//                 res.send({
//                     status: true,
//                     message:'File has been seen',
//                     data:{
//                         name: avatar.name,
//                         mimetype: avatar.mimetype,
//                         size:avatar.size
//                     }
//                 });
//             }
//         }catch(err){
//             res.status(500).send(err);
//         }
//     })
        
// }