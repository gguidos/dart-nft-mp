export default function interceptResponse(req, res, next) {

    const oldSend = res.send
  res.send = data => {
   
    const response = {
      status: data.status,
      data: { message: data.data },
    };
    res.send = oldSend
    return res.send(response)
  }
  next();
  
}
