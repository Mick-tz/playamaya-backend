const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('connnected to db'))
    .catch((err: any) => console.log(err));