

// web URL 拼接
const webUrlSplicing = (url, params) => {
  const paramArray = Object.entries(params).map(paramItemArr => `${paramItemArr[0]}=${paramItemArr[1]}`)
  const paramString = paramArray.join('&')
  return `${url}?${paramString}`
}

// Await
export async function request (obj = {}) {
  return new Promise(((resolve, reject) => {
    let url = obj.url
    // 如果是非get方式却传入了params，将params拼到url上
    if(obj.method && `${obj.method}`.toUpperCase() !== 'GET' && obj.params) {
      url = webUrlSplicing(url, obj.params)
    }
    wx.request({
      url,
      data: obj.data || {},
      method: obj.method ? `${obj.method}`.toUpperCase() : 'GET',
      header: obj.header || {},
      success (res) {
        if (res && res.statusCode === 200) {
          resolve(res.data)
        } else {
          uni.showToast({
            title: `${res.errMsg}`,
            duration: 2000,
            icon: 'none'
          });
          reject(res)
        }
      },
      fail (err) {
        uni.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none',
          duration: 2000
        });
        reject(err)
      }
    });
  }))
}

