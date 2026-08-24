const response = (res, success = true, message = null, data = null)=>{
    return res.status(200).json({
        success : success,
        message : message,
        data : data
    })
}

export default response;