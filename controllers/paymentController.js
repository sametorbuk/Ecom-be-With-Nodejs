const Iyzipay = require("iyzipay");
const iyzipay = require("../config/iyzico");

const initiate3DPayment = (req, res) => {
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
    callbackUrl: `${process.env.BASE_URL}/api/payment/3d-callback`,
    paymentCard: {
      cardHolderName: "Samet Orbuk",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "BY789",
      name: "Samet",
      surname: "Orbuk",
      gsmNumber: "+905350000000",
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
        price: "50",
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
      return res
        .status(500)
        .json({ error: "Ödeme başlatılırken hata oluştu." });
    }

    res.status(200).json({
      htmlContent: result.threeDSHtmlContent,
    });
  });
};

const verify3DSecurePayment = (req, res) => {
  const { paymentId, conversationData } = req.body;

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
