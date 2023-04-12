const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://nguyenthang070103:thanglodc123@assignment.plho7hy.mongodb.net/Assignment?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log("Connect Failed");
    }
}

module.exports = {connect};