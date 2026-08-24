const asyncWrapper = (controller)=>{
    return async(req, res, next)=>{
        try{
            await controller();
        }catch(error){
            next(error)
        }
    }
}

export default asyncWrapper;