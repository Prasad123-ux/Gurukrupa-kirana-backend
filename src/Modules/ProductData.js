const {mongoose }= require('../Config/db.js'); 

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        // required: true,
        trim: true, // Removes extra spaces
    },
    productCategory: {
        type: String,
        // required: true,
    },
    productPrice: {
        type: Number,
        // required: true,
        min: 0, // Ensures no negative prices 

    },
    productStockQuantity: {
        type: Number,
        // required: true,
        min: 0, // Ensures no negative stock
    },
    productUnit: {
        type: String,
        // required: true,
    },
    productDescription: {
        type: String,
        // required: false,
        trim: true, // Removes extra spaces
    },
    productLink: {
        type: [],
        // required: false,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v); // Validates URLs
            },
            message: "Invalid URL format",
        },
    },  
    role:{
        type:String,
        enum:['user', 'admin', ],
        default:'admin'
    }



}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    });

const ProductRegister = mongoose.model('ProductRegister', productSchema);

module.exports ={ ProductRegister};
