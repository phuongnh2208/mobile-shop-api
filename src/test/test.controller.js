const NodeCache = require ("node-cache");
const ProductModel = require ("../apps/models/product");
const redisClient = require ("../common/init.redis");
const {performance} = require ("perf_hooks");
const cache = new NodeCache({
    stdTTL: 10 // lưu trong RAM 10s
}); 

exports.cacheBasic = async (req, res) => {

    const products = [
        {id: 1, name: "Iphone 15"},
        {id: 2, name: "Iphone 16"},
        {id: 3, name: "Iphone 17"},
    ];
    let message;
    let data;
    // lay du lieu tu cache
    const cacheProducts = cache.get("products");
    if(cacheProducts){
        message = "Get data in cache";
        data = cacheProducts;
    } else {
        message = "Get data in database";
        data = products;
        // sau khi ngt1 lấy dữ liệu từ db thì lưu vào cach cho người tiếp theo lấy
        cache.set("products",data);
    }
    return res.status(200).json({
        status: "success",
        message,
        data,
    });
}
exports.cacheAdvanced = async (req, res) => {
    let message;
    let data;
    let startTime = performance.now();
    let endTime;
    const cacheProducts = cache.get("products");
    if (cacheProducts) {
        message = "Get data in cache";
        data = cacheProducts;
        endTime = performance.now();
    } else {
        message = "Get data in database";
        data = await ProductModel.find().limit(100);
        cache.set("products", data);
        endTime = performance.now();
    }
    return res.status(200).json({
        status: "success",
        message,
        time: endTime - startTime,
        data,
    });
}
exports.cacheRedis = async (req, res) => {
    let message;
    let data;
    let startTime = performance.now();
    let endTime;
    const cacheProducts = await redisClient.json.get("products");
    if (cacheProducts) {
        message = "Get data in cache";
        data = cacheProducts;
        endTime = performance.now();
    } else {
        message = "Get data in database";
        data = await ProductModel.find().limit(100);
        await redisClient.json.set("products", "$", data);
        await redisClient.expire("products",10);
        endTime = performance.now();
    }
    return res.status(200).json({
        status: "success",
        message,
        time: endTime - startTime,
        data,
    });
}