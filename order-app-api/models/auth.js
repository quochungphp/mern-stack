const authModel = require('../schemas/auth');

module.exports = {
  getToken: async (token) => {
    return await authModel.findOne({
      token: token
    });
  },
  saveToken: async (params, options = null) => {
    let res = await module.exports.getToken(params.token)
    const date = Date.now()
    let data = null
    if (!res) {
      data = {
        email: params.email,
        name: params.email,
        user_id: params.id,
        login_at: params.login_at,
        login_num: 1,
        created: date,
        token: params.token,
        user_token: params.user_token
      }
      return new authModel(data).save();
    } else {
      data = {
        modified: date,
        login_num: isNaN(res.login_num) ? 1 : res.login_num + 1
      }
      return authModel.updateOne({ _id: res._id }, data);
    }
  }
}
