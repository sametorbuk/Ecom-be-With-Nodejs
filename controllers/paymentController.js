const Iyzipay = require("iyzipay");
const iyzipay = require("../config/iyzico");
require("dotenv").config();

const initiate3DPayment = (req, res) => {
  const { price, cardHolderName, cardNumber, expireMonth, expireYear, cvc } =
    req.body;

  const paymentRequest = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "123456789",
    price: "100",
    paidPrice: "100",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "B67832",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: `${process.env.BACKEND_BASE_URL}/teknotik/payment/3d-callback`,
    paymentCard: {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expireMonth: expireMonth,
      expireYear: expireYear,
      cvc: cvc,
      registerCard: "0",
    },
    buyer: {
      id: "BY789",
      name: "Samet",
      surname: "Orbuk",
      gsmNumber: "+905057807035",
      email: "samet@example.com",
      identityNumber: "74300864791",
      ip: req.ip,
    },
    shippingAddress: {
      contactName: "Samet Orbuk",
      city: "Istanbul",
      country: "Turkey",
      address: "Kadıköy",
      zipCode: "34742",
    },
    billingAddress: {
      contactName: "Samet Orbuk",
      city: "Istanbul",
      country: "Turkey",
      address: "Kadıköy",
      zipCode: "34742",
    },
    basketItems: [
      {
        id: "BI101",
        name: "Ürün 1",
        category1: "Elektronik",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: price,
      },
      {
        id: "BI102",
        name: "Ürün 2",
        category1: "Elektronik",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "50",
      },
    ],
  };

  iyzipay.threedsInitialize.create(paymentRequest, (err, result) => {
    if (err) {
      console.log("Hata Detayı:", err);
      return res
        .status(500)
        .json({ error: "Ödeme başlatılırken hata oluştu." });
    }
    console.log(result);
    res.status(200).json({
      htmlContent: result.threeDSHtmlContent,
    });
  });
};

const verify3DSecurePayment = (req, res) => {
  const { paymentId, conversationData } = req.body;
  console.log("3D Callback Data:", req.body);

  const verifyRequest = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "123456789",
    paymentId: paymentId,
    conversationData: conversationData,
  };

  iyzipay.threedsPayment.create(verifyRequest, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Doğrulama sırasında hata oluştu." });
    }

    if (result.status === "success") {
      res.status(200).send("Ödeme başarılı, teşekkürler!");
    } else {
      res.status(400).send("Ödeme başarısız. Lütfen tekrar deneyin.");
    }
  });
};

module.exports = { initiate3DPayment, verify3DSecurePayment };
