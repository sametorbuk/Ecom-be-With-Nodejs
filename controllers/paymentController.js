const Iyzipay = require("iyzipay");
const iyzipay = require("../config/iyzico");
require("dotenv").config();

const initiate3DPayment = (req, res) => {
  const { price, cardHolderName, cardNumber, expireMonth, expireYear, cvc } =
    req.body;

  const paymentRequest = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "123456789",
    price: price,
    paidPrice: price,
    installment: 1,
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    basketId: "B67832",
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: `${process.env.BACKEND_BASE_URL}/teknotik/payment/3d-callback`,
    paymentCard: {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expireYear: expireYear,
      expireMonth: expireMonth,
      cvc: cvc,
      registerCard: 0,
    },
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      identityNumber: "74300864791",
      email: "email@email.com",
      gsmNumber: "+905350000000",
      registrationDate: "2013-04-21 15:12:09",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationAddress: "Address",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
      ip: "85.34.78.112",
    },
    shippingAddress: {
      address: "Address",
      zipCode: "34742",
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
    },
    billingAddress: {
      address: "Address",
      zipCode: "34742",
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
    },
    basketItems: [
      {
        id: "BI101",
        price: "1",
        name: "Binocular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      },
      {
        id: "BI102",
        price: "1",
        name: "Game code",
        category1: "Game",
        category2: "Online Game Items",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
      },
      {
        id: "BI103",
        price: "1",
        name: "Usb",
        category1: "Electronics",
        category2: "Usb / Cable",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
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
