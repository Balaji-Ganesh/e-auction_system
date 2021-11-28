const upload  = require("../middleware/upload");
const express = require("express");
const router  = express.Router;

router.post("/upload", upload.single("file"), async (request, response)=>{
    if(request.file === undefined)
        return response.send("Must select one of the valid image");
    
    const imgUrl = `http://localhost:4000/file/${request.file.filename}`    // change port, if error..
    return response.send(imgUrl);
});

module.exports = router;