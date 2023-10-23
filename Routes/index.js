const express = require("express")
const jwt = require("jsonwebtoken")
const multer = require("multer")

const [createMaincategory, getAllMaincategory, getSingleMaincategory, updateMaincategory, deleteMaincategory] = require("../Controller/MaincategoryController")
const [createSubcategory, getAllSubcategory, getSingleSubcategory, updateSubcategory, deleteSubcategory] = require("../Controller/SubcategoryController")
const [createBrand, getAllBrand, getSingleBrand, updateBrand, deleteBrand] = require("../Controller/BrandController")
const [createProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct, searchProduct] = require("../Controller/ProductController")
const [createUser, getAllUser, getSingleUser, updateUser, deleteUser, login, forgetPassword1,forgetPassword2,forgetPassword3] = require("../Controller/UserController")
const [createCart, getAllCart, getSingleCart, updateCart, deleteCart] = require("../Controller/CartController")
const [createWishlist, getAllWishlist, deleteWishlist] = require("../Controller/WishlistController")
const [createCheckout, getAllCheckout, getUserAllCheckout, getSingleCheckout, updateCheckout, deleteCheckout,order,verifyOrder] = require("../Controller/CheckoutController")
const [createNewsletter, getAllNewsletter, deleteNewsletter] = require("../Controller/NewsletterController")
const [createContact, getAllContact, getSingleContact, updateContact, deleteContact] = require("../Controller/ContactController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
    limits: {
        fieldSize: 10485760,
    }
})
const upload = multer({ storage: storage })



const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
    limits: {
        fieldSize: 10485760,
    }
})
const upload2 = multer({ storage: storage2 })

const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/brand')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
    limits: {
        fieldSize: 10485760,
    }
})
const upload3 = multer ({storage:storage3})

async function verifyAdmin(req, res, next) {
    var token = req.headers.authorization
    jwt.verify(token, process.env.JWT_ADMIN_KEY, (error => {
        if (error)
            res.status(401).send({ result: "Fail", message: "You are not Authorized to Accss This API" })
        else
            next()
    }))
}

async function verifyBuyer(req, res, next) {
    var token = req.headers.authorization
    jwt.verify(token, process.env.JWT_BUYER_KEY, (error => {
        if (error)
            res.status(401).send({ result: "Fail", message: "You are not Authorized to Accss This API" })
        else
            next()
    }))
}

async function verifyUser(req, res, next) {
    var token = req.headers.authorization
    var flag = false
    jwt.verify(token, process.env.JWT_BUYER_KEY, (error => {
        if (!error)
            flag = true
    }))
    if (flag == false) {
        jwt.verify(token, process.env.JWT_ADMIN_KEY, (error => {
            if (!error)
                flag = true
        }))
    }
    if (flag)
        next()
    else
        res.status(401).send({ result: "Fail", message: "You are not Authorized to Accss This API" })
}


const router = new express.Router()

router.post("/maincategory", verifyAdmin, createMaincategory)
router.get("/maincategory", getAllMaincategory)
router.get("/maincategory/:_id", getSingleMaincategory)
router.put("/maincategory/:_id", verifyAdmin, updateMaincategory)
router.delete("/maincategory/:_id", verifyAdmin, deleteMaincategory)


router.post("/subcategory", verifyAdmin, createSubcategory)
router.get("/subcategory", getAllSubcategory)
router.get("/subcategory/:_id", getSingleSubcategory)
router.put("/subcategory/:_id", verifyAdmin, updateSubcategory)
router.delete("/subcategory/:_id", verifyAdmin, deleteSubcategory)


router.post("/brand",upload3.single("pic"), verifyAdmin, createBrand)
router.get("/brand", getAllBrand)
router.get("/brand/:_id", getSingleBrand)
router.put("/brand/:_id", upload3.single("pic"), verifyAdmin, updateBrand)
router.delete("/brand/:_id", verifyAdmin, deleteBrand)

router.post("/product", upload.fields([
    { name: 'pic1', maxCount: 1 },
    { name: 'pic2', maxCount: 1 },
    { name: 'pic3', maxCount: 1 },
    { name: 'pic4', maxCount: 1 }
]), verifyAdmin, createProduct)
router.get("/product", getAllProduct)
router.get("/product/:_id", getSingleProduct)
router.put("/product/:_id", upload.fields([
    { name: 'pic1', maxCount: 1 },
    { name: 'pic2', maxCount: 1 },
    { name: 'pic3', maxCount: 1 },
    { name: 'pic4', maxCount: 1 }
]), verifyAdmin, updateProduct)
router.delete("/product/:_id", verifyAdmin, deleteProduct)
router.post("/product/search", searchProduct)

router.post("/user", createUser)
router.get("/user", verifyAdmin, getAllUser)
router.get("/user/:_id", verifyUser, getSingleUser)
router.put("/user/:_id", upload2.single("pic"), verifyUser, updateUser)
router.delete("/user/:_id", verifyAdmin, deleteUser)
router.post("/user/login", login)
router.post("/user/forget-password-1", forgetPassword1)
router.post("/user/forget-password-2", forgetPassword2)
router.post("/user/forget-password-3", forgetPassword3)


router.post("/cart", verifyBuyer, createCart)
router.get("/cart/:userid", verifyBuyer, getAllCart)
router.get("/cart/single/:_id", verifyBuyer, getSingleCart)
router.put("/cart/:_id", verifyBuyer, updateCart)
router.delete("/cart/:_id", verifyBuyer, deleteCart)

router.post("/wishlist", verifyBuyer, createWishlist)
router.get("/wishlist/:userid", verifyBuyer, getAllWishlist)
router.delete("/wishlist/:_id", verifyBuyer, deleteWishlist)

router.post("/checkout", verifyBuyer, createCheckout)
router.get("/checkout", verifyAdmin, getAllCheckout)
router.get("/checkout/:userid", verifyBuyer, getUserAllCheckout)
router.get("/checkout/single/:_id", verifyAdmin, getSingleCheckout)
router.put("/checkout/:_id", verifyAdmin, updateCheckout)
router.delete("/checkout/:_id", verifyAdmin, deleteCheckout)
router.post("/checkout/order", verifyBuyer, order)
router.post("/checkout/order-verify", verifyBuyer, verifyOrder)

router.post("/newsletter", createNewsletter)
router.get("/newsletter",verifyAdmin, getAllNewsletter)
router.delete("/newsletter/:_id", verifyAdmin, deleteNewsletter)

router.post("/contact", createContact)
router.get("/contact", verifyAdmin, getAllContact)
router.get("/contact/:_id", verifyAdmin, getSingleContact)
router.put("/contact/:_id", verifyAdmin, updateContact)
router.delete("/contact/:_id", verifyAdmin, deleteContact)


module.exports = router