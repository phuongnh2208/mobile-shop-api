const TokenModel = require("../apps/models/token");
const  {addTokenBlackList} = require ("./redis.token");

exports.storeCustomerToken = async (customerId, accessToken, refreshToken) => {
    const token = await TokenModel.findOne({customerId});
    if (token) this.deleteCustomerToken(customerId);
    await TokenModel({
        customerId, 
        accessToken, 
        refreshToken
    }).save();
};

exports.deleteCustomerToken = async (customerId) => {
    const token = await TokenModel.findOne({customerId});
    if (!token) {
        // No token stored for this customer — nothing to delete
        return;
    }

    // Move Token to Redis
    await addTokenBlackList(customerId);
    // Delete Token from db
    await TokenModel.deleteOne({customerId});
};

exports.storeUserToken = async (userId, accessToken, refreshToken) => {
    const token = await TokenModel.findOne({customerId: userId});
    if (token) await exports.deleteUserToken(userId);
    await TokenModel({
        customerId: userId,
        accessToken, 
        refreshToken
    }).save();
};

exports.deleteUserToken = async (userId) => {
    const token = await TokenModel.findOne({customerId: userId});
    if (!token) {
        // No token stored for this user — nothing to delete
        return;
    }
    await addTokenBlackList(userId);
    await TokenModel.deleteOne({customerId: userId});
};