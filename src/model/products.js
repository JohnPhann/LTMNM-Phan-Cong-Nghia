const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    price: { 
        type: Number, 
        required: true,
        min: 0 
    },
    stock: { 
        type: Number, 
        required: true,
        min: 0 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Products", productSchema);